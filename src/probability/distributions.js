function validateNumber(value, label) {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number.`);
  }
}

function logFactorial(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('n must be a non-negative integer.');
  }

  let sum = 0;
  for (let i = 2; i <= n; i += 1) {
    sum += Math.log(i);
  }
  return sum;
}

function erf(x) {
  // Abramowitz and Stegun approximation
  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * absX);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;

  const poly = ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t;
  const value = 1 - poly * Math.exp(-absX * absX);
  return sign * value;
}

function normalPdf(x, mean = 0, stdDev = 1) {
  validateNumber(x, 'x');
  validateNumber(mean, 'mean');
  validateNumber(stdDev, 'stdDev');

  if (stdDev <= 0) {
    throw new Error('stdDev must be positive.');
  }

  const z = (x - mean) / stdDev;
  return Math.exp(-0.5 * z * z) / (stdDev * Math.sqrt(2 * Math.PI));
}

function normalCdf(x, mean = 0, stdDev = 1) {
  validateNumber(x, 'x');
  validateNumber(mean, 'mean');
  validateNumber(stdDev, 'stdDev');

  if (stdDev <= 0) {
    throw new Error('stdDev must be positive.');
  }

  const z = (x - mean) / (stdDev * Math.SQRT2);
  return 0.5 * (1 + erf(z));
}

function poissonPmf(k, lambda) {
  if (!Number.isInteger(k) || k < 0) {
    throw new Error('k must be a non-negative integer.');
  }

  validateNumber(lambda, 'lambda');
  if (lambda <= 0) {
    throw new Error('lambda must be positive.');
  }

  const logP = -lambda + k * Math.log(lambda) - logFactorial(k);
  return Math.exp(logP);
}

function logCombination(n, k) {
  if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0 || k > n) {
    throw new Error('Invalid n and k for combination.');
  }

  const m = Math.min(k, n - k);
  let logValue = 0;
  for (let i = 1; i <= m; i += 1) {
    logValue += Math.log(n - m + i) - Math.log(i);
  }
  return logValue;
}

function binomialPmf(k, n, p) {
  if (!Number.isInteger(k) || k < 0) {
    throw new Error('k must be a non-negative integer.');
  }

  if (!Number.isInteger(n) || n < 0) {
    throw new Error('n must be a non-negative integer.');
  }

  validateNumber(p, 'p');

  if (p < 0 || p > 1) {
    throw new Error('p must be in [0, 1].');
  }

  if (k > n) {
    return 0;
  }

  if (p === 0) {
    return k === 0 ? 1 : 0;
  }

  if (p === 1) {
    return k === n ? 1 : 0;
  }

  const logP = logCombination(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p);
  return Math.exp(logP);
}

module.exports = {
  normalPdf,
  normalCdf,
  poissonPmf,
  binomialPmf,
};
