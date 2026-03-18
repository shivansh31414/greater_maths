const ATOMIC_MASSES = {
  H: 1.008,
  C: 12.011,
  N: 14.007,
  O: 15.999,
  Na: 22.99,
  Mg: 24.305,
  Al: 26.982,
  Si: 28.085,
  P: 30.974,
  S: 32.06,
  Cl: 35.45,
  K: 39.098,
  Ca: 40.078,
  Fe: 55.845,
  Cu: 63.546,
  Zn: 65.38,
};

function parseFormula(formula) {
  if (typeof formula !== 'string' || formula.trim().length === 0) {
    throw new Error('formula must be a non-empty string.');
  }

  const cleaned = formula.replace(/\s+/g, '');
  let index = 0;

  function parseGroup() {
    let mass = 0;

    while (index < cleaned.length) {
      const char = cleaned[index];

      if (char === '(') {
        index += 1;
        const innerMass = parseGroup();
        const multiplier = parseNumber();
        mass += innerMass * multiplier;
        continue;
      }

      if (char === ')') {
        index += 1;
        return mass;
      }

      if (!/[A-Z]/.test(char)) {
        throw new Error(`Invalid formula near character '${char}'.`);
      }

      let symbol = cleaned[index];
      index += 1;
      while (index < cleaned.length && /[a-z]/.test(cleaned[index])) {
        symbol += cleaned[index];
        index += 1;
      }

      const atomicMass = ATOMIC_MASSES[symbol];
      if (!atomicMass) {
        throw new Error(`Unsupported element symbol: ${symbol}`);
      }

      mass += atomicMass * parseNumber();
    }

    return mass;
  }

  function parseNumber() {
    let digits = '';
    while (index < cleaned.length && /\d/.test(cleaned[index])) {
      digits += cleaned[index];
      index += 1;
    }

    if (digits.length === 0) {
      return 1;
    }

    return Number.parseInt(digits, 10);
  }

  const total = parseGroup();
  if (index < cleaned.length) {
    throw new Error('Unexpected trailing characters in formula.');
  }

  return total;
}

function molarMass(formula) {
  return parseFormula(formula);
}

function gramsToMoles(grams, molarMassValue) {
  if (!Number.isFinite(grams) || !Number.isFinite(molarMassValue) || molarMassValue <= 0) {
    throw new Error('grams must be finite and molarMassValue must be a positive number.');
  }

  return grams / molarMassValue;
}

function molesToGrams(moles, molarMassValue) {
  if (!Number.isFinite(moles) || !Number.isFinite(molarMassValue) || molarMassValue <= 0) {
    throw new Error('moles must be finite and molarMassValue must be a positive number.');
  }

  return moles * molarMassValue;
}

function theoreticalYield({
  reactantMass,
  reactantMolarMass,
  stoichReactant,
  stoichProduct,
  productMolarMass,
}) {
  const values = [reactantMass, reactantMolarMass, stoichReactant, stoichProduct, productMolarMass];

  if (values.some((v) => !Number.isFinite(v) || v <= 0)) {
    throw new Error('All theoreticalYield inputs must be positive finite numbers.');
  }

  const reactantMoles = gramsToMoles(reactantMass, reactantMolarMass);
  const productMoles = (reactantMoles * stoichProduct) / stoichReactant;

  return {
    reactantMoles,
    productMoles,
    productMass: molesToGrams(productMoles, productMolarMass),
  };
}

module.exports = {
  molarMass,
  gramsToMoles,
  molesToGrams,
  theoreticalYield,
};
