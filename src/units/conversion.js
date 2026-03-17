const BASE_DIMENSIONS = ['L', 'M', 'T', 'I', 'TH', 'N', 'J'];

const UNITS = {
  m: { factor: 1, dimensions: { L: 1 } },
  cm: { factor: 0.01, dimensions: { L: 1 } },
  mm: { factor: 0.001, dimensions: { L: 1 } },
  km: { factor: 1000, dimensions: { L: 1 } },
  in: { factor: 0.0254, dimensions: { L: 1 } },
  ft: { factor: 0.3048, dimensions: { L: 1 } },
  yd: { factor: 0.9144, dimensions: { L: 1 } },
  mi: { factor: 1609.344, dimensions: { L: 1 } },

  kg: { factor: 1, dimensions: { M: 1 } },
  g: { factor: 0.001, dimensions: { M: 1 } },
  mg: { factor: 1e-6, dimensions: { M: 1 } },
  lb: { factor: 0.45359237, dimensions: { M: 1 } },

  s: { factor: 1, dimensions: { T: 1 } },
  min: { factor: 60, dimensions: { T: 1 } },
  h: { factor: 3600, dimensions: { T: 1 } },

  A: { factor: 1, dimensions: { I: 1 } },

  K: { factor: 1, dimensions: { TH: 1 }, offset: 'K' },
  C: { factor: 1, dimensions: { TH: 1 }, offset: 'C' },
  F: { factor: 5 / 9, dimensions: { TH: 1 }, offset: 'F' },

  mol: { factor: 1, dimensions: { N: 1 } },
  cd: { factor: 1, dimensions: { J: 1 } },

  N: { factor: 1, dimensions: { M: 1, L: 1, T: -2 } },
  Pa: { factor: 1, dimensions: { M: 1, L: -1, T: -2 } },
  J: { factor: 1, dimensions: { M: 1, L: 2, T: -2 } },
  W: { factor: 1, dimensions: { M: 1, L: 2, T: -3 } },
};

function zeroDimensions() {
  return Object.fromEntries(BASE_DIMENSIONS.map((key) => [key, 0]));
}

function mergeDimensions(base, delta, scale = 1) {
  for (const [key, exponent] of Object.entries(delta)) {
    base[key] += exponent * scale;
  }
}

function parseUnitToken(token) {
  const match = token.match(/^([A-Za-z]+)(?:\^(-?\d+))?$/);
  if (!match) {
    throw new Error(`Invalid unit token: ${token}`);
  }

  const symbol = match[1];
  const exponent = match[2] ? Number.parseInt(match[2], 10) : 1;
  const unit = UNITS[symbol];

  if (!unit) {
    throw new Error(`Unsupported unit: ${symbol}`);
  }

  return { symbol, exponent, unit };
}

function isSingleTokenExpression(expression) {
  return /^\s*[A-Za-z]+\s*$/.test(expression);
}

function parseUnitExpression(expression) {
  if (typeof expression !== 'string' || expression.trim().length === 0) {
    throw new Error('Unit expression must be a non-empty string.');
  }

  const compact = expression.replace(/\s+/g, '');
  const tokens = compact.split(/([*/])/).filter(Boolean);

  let op = '*';
  let factor = 1;
  const dimensions = zeroDimensions();
  const offsetUnits = new Set();

  for (const token of tokens) {
    if (token === '*' || token === '/') {
      op = token;
      continue;
    }

    const { symbol, exponent, unit } = parseUnitToken(token);
    const signedExponent = op === '*' ? exponent : -exponent;

    factor *= Math.pow(unit.factor, signedExponent);
    mergeDimensions(dimensions, unit.dimensions, signedExponent);

    if (unit.offset) {
      offsetUnits.add(symbol);
    }
  }

  return {
    factor,
    dimensions,
    offsetUnits,
    singleToken: isSingleTokenExpression(expression),
  };
}

function sameDimensions(a, b) {
  return BASE_DIMENSIONS.every((key) => a[key] === b[key]);
}

function toKelvin(value, unit) {
  if (unit === 'K') return value;
  if (unit === 'C') return value + 273.15;
  if (unit === 'F') return ((value - 32) * 5) / 9 + 273.15;
  throw new Error(`Unsupported temperature unit: ${unit}`);
}

function fromKelvin(value, unit) {
  if (unit === 'K') return value;
  if (unit === 'C') return value - 273.15;
  if (unit === 'F') return ((value - 273.15) * 9) / 5 + 32;
  throw new Error(`Unsupported temperature unit: ${unit}`);
}

function convert(value, fromUnitExpression, toUnitExpression) {
  if (!Number.isFinite(value)) {
    throw new Error('Value must be a finite number.');
  }

  const from = parseUnitExpression(fromUnitExpression);
  const to = parseUnitExpression(toUnitExpression);

  if (!sameDimensions(from.dimensions, to.dimensions)) {
    throw new Error('Dimension mismatch between source and target units.');
  }

  if (from.offsetUnits.size > 0 || to.offsetUnits.size > 0) {
    if (
      from.singleToken &&
      to.singleToken &&
      from.offsetUnits.size === 1 &&
      to.offsetUnits.size === 1
    ) {
      const [fromSymbol] = [...from.offsetUnits];
      const [toSymbol] = [...to.offsetUnits];
      return fromKelvin(toKelvin(value, fromSymbol), toSymbol);
    }

    throw new Error('Offset temperature units can only be converted as standalone units.');
  }

  return (value * from.factor) / to.factor;
}

function analyzeDimensions(unitExpression) {
  const { dimensions } = parseUnitExpression(unitExpression);
  return dimensions;
}

module.exports = {
  convert,
  analyzeDimensions,
};
