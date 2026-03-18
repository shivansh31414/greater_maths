const {
  newtonRaphson,
  numericalDerivative,
  numericalIntegration,
  solveODEEuler,
  solveODERungeKutta4,
} = require('../src/numerical/methods');

describe('Numerical methods', () => {
  test('newton-raphson finds sqrt(2)', () => {
    const result = newtonRaphson((x) => x * x - 2, 1.0);
    expect(result.converged).toBe(true);
    expect(result.root).toBeCloseTo(Math.sqrt(2), 8);
  });

  test('numerical derivative approximates cos at x=0', () => {
    const d = numericalDerivative(Math.sin, 0);
    expect(d).toBeCloseTo(1, 7);
  });

  test('numerical integration approximates integral of exp(-x^2) from 0 to 1', () => {
    const integral = numericalIntegration((x) => Math.exp(-(x * x)), 0, 1, 2000, 'simpson');
    expect(integral).toBeCloseTo(0.746824, 5);
  });

  test("euler solver approximates y' = y, y(0)=1 at x=1", () => {
    const points = solveODEEuler((x, y) => y, 0, 1, 0.01, 100);
    const yAt1 = points[points.length - 1].y;
    expect(yAt1).toBeCloseTo(Math.E, 1);
  });

  test("rk4 solver approximates y' = y, y(0)=1 at x=1 with high accuracy", () => {
    const points = solveODERungeKutta4((x, y) => y, 0, 1, 0.1, 10);
    const yAt1 = points[points.length - 1].y;
    expect(yAt1).toBeCloseTo(Math.E, 4);
  });
});
