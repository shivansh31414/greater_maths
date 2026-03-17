const {
  normalPdf,
  normalCdf,
  poissonPmf,
  binomialPmf,
} = require('../src/probability/distributions');

describe('Probability distributions', () => {
  test('normal pdf at mean equals 1/sqrt(2pi)', () => {
    expect(normalPdf(0, 0, 1)).toBeCloseTo(1 / Math.sqrt(2 * Math.PI), 12);
  });

  test('normal cdf at mean is 0.5', () => {
    expect(normalCdf(0, 0, 1)).toBeCloseTo(0.5, 6);
  });

  test('poisson pmf validates integer k', () => {
    expect(() => poissonPmf(1.5, 2)).toThrow(/non-negative integer/);
  });

  test('binomial pmf handles large n without overflow', () => {
    const value = binomialPmf(500, 1000, 0.5);
    expect(Number.isFinite(value)).toBe(true);
    expect(value).toBeGreaterThan(0);
  });

  test('binomial with k > n returns 0', () => {
    expect(binomialPmf(5, 3, 0.5)).toBe(0);
  });
});
