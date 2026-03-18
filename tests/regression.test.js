const { linearLeastSquares, polynomialFit } = require('../src/regression/fitting');

describe('Regression and curve fitting', () => {
  test('linear least squares recovers slope and intercept for ideal data', () => {
    const x = [0, 1, 2, 3, 4, 5];
    const y = x.map((v) => 2 * v + 1);

    const result = linearLeastSquares(x, y);

    expect(result.slope).toBeCloseTo(2, 10);
    expect(result.intercept).toBeCloseTo(1, 10);
    expect(result.rSquared).toBeCloseTo(1, 10);
  });

  test('polynomial fit recovers quadratic coefficients', () => {
    const x = [-2, -1, 0, 1, 2, 3];
    const y = x.map((v) => v * v + 2 * v + 1);

    const result = polynomialFit(x, y, 2);

    expect(result.coefficients[0]).toBeCloseTo(1, 8);
    expect(result.coefficients[1]).toBeCloseTo(2, 8);
    expect(result.coefficients[2]).toBeCloseTo(1, 8);
    expect(result.rSquared).toBeCloseTo(1, 8);
  });

  test('linear fit handles noisy scientific data with high r-squared', () => {
    const x = [0, 1, 2, 3, 4, 5, 6];
    const y = [0.1, 1.2, 2.1, 3.1, 3.9, 5.2, 6.1];

    const result = linearLeastSquares(x, y);

    expect(result.slope).toBeCloseTo(1.0, 1);
    expect(result.rSquared).toBeGreaterThan(0.98);
  });
});
