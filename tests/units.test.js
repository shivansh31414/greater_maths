const { convert, analyzeDimensions } = require('../src/units/conversion');

describe('Unit conversion and dimensional analysis', () => {
  test('converts metric length', () => {
    expect(convert(100, 'cm', 'm')).toBeCloseTo(1, 12);
  });

  test('converts compound units with dimensional consistency', () => {
    const value = convert(36, 'km/h', 'm/s');
    expect(value).toBeCloseTo(10, 10);
  });

  test('rejects dimensional mismatch', () => {
    expect(() => convert(1, 'm', 's')).toThrow(/Dimension mismatch/);
  });

  test('temperature conversion handles offsets', () => {
    expect(convert(0, 'C', 'F')).toBeCloseTo(32, 10);
    expect(convert(32, 'F', 'C')).toBeCloseTo(0, 10);
  });

  test('dimension analysis returns expected exponents', () => {
    expect(analyzeDimensions('N')).toEqual({ L: 1, M: 1, T: -2, I: 0, TH: 0, N: 0, J: 0 });
  });
});
