function validateFunction(fn) {
  if (typeof fn !== 'function') {
    throw new Error('Expected a function of one variable.');
  }
}

function derivative(fn, x, h = 1e-5) {
  validateFunction(fn);

  if (!Number.isFinite(x) || !Number.isFinite(h) || h <= 0) {
    throw new Error('x and h must be finite numbers and h must be positive.');
  }

  return (fn(x + h) - fn(x - h)) / (2 * h);
}

function integral(fn, a, b, segments = 1000, method = 'simpson') {
  validateFunction(fn);

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new Error('Integration bounds must be finite numbers.');
  }

  if (!Number.isInteger(segments) || segments <= 0) {
    throw new Error('segments must be a positive integer.');
  }

  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const sign = a <= b ? 1 : -1;

  if (method === 'trapezoid') {
    const h = (upper - lower) / segments;
    let sum = 0.5 * (fn(lower) + fn(upper));
    for (let i = 1; i < segments; i += 1) {
      sum += fn(lower + i * h);
    }
    return sign * sum * h;
  }

  if (method !== 'simpson') {
    throw new Error("method must be either 'simpson' or 'trapezoid'.");
  }

  const evenSegments = segments % 2 === 0 ? segments : segments + 1;
  const h = (upper - lower) / evenSegments;
  let sum = fn(lower) + fn(upper);

  for (let i = 1; i < evenSegments; i += 1) {
    const coefficient = i % 2 === 0 ? 2 : 4;
    sum += coefficient * fn(lower + i * h);
  }

  return (sign * (sum * h)) / 3;
}

module.exports = { derivative, integral };
