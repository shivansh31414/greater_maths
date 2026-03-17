const { Complex } = require('../src/core/complex');

describe('Complex', () => {
  test('adds and multiplies correctly', () => {
    const a = new Complex(2, 3);
    const b = new Complex(4, -1);

    const sum = a.add(b);
    const product = a.mul(b);

    expect(sum.real).toBe(6);
    expect(sum.imag).toBe(2);
    expect(product.real).toBe(11);
    expect(product.imag).toBe(10);
  });

  test('division by zero throws', () => {
    const a = new Complex(1, 2);
    expect(() => a.div(new Complex(0, 0))).toThrow(/Division by zero/);
  });

  test('magnitude is stable with floating values', () => {
    const value = new Complex(0.1, 0.2);
    expect(value.abs()).toBeCloseTo(Math.sqrt(0.05), 12);
  });
});
