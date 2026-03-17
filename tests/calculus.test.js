const { derivative, integral } = require('../src/core/calculus');

describe('Calculus', () => {
  test("derivative approximates sin' at zero", () => {
    const d = derivative(Math.sin, 0);
    expect(d).toBeCloseTo(1, 6);
  });

  test('integral approximates area under sin from 0 to pi', () => {
    const area = integral(Math.sin, 0, Math.PI, 1000);
    expect(area).toBeCloseTo(2, 6);
  });

  test('integral handles reverse bounds', () => {
    const area = integral((x) => x * x, 2, 0, 1000);
    expect(area).toBeCloseTo(-(8 / 3), 4);
  });

  test('floating-point derivative precision is reasonable', () => {
    const d = derivative((x) => x * x, 0.1);
    expect(d).toBeCloseTo(0.2, 6);
  });
});
