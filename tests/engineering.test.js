const { ohmsLaw, impedanceSeriesRLC } = require('../src/engineering/circuit');
const { molarMass, gramsToMoles, theoreticalYield } = require('../src/engineering/stoichiometry');

describe('Engineering modules', () => {
  test("ohm's law solves for current", () => {
    const result = ohmsLaw({ voltage: 12, resistance: 6 });
    expect(result.current).toBeCloseTo(2, 12);
  });

  test('series RLC impedance at resonance has near-zero reactive part', () => {
    const l = 10e-3;
    const c = 100e-6;
    const resonance = 1 / (2 * Math.PI * Math.sqrt(l * c));

    const result = impedanceSeriesRLC(10, l, c, resonance);
    expect(result.impedance.imag).toBeCloseTo(0, 5);
    expect(result.magnitude).toBeCloseTo(10, 5);
  });

  test('molar mass of water is approximately 18.015 g/mol', () => {
    expect(molarMass('H2O')).toBeCloseTo(18.015, 3);
  });

  test('grams to moles conversion', () => {
    expect(gramsToMoles(18.015, molarMass('H2O'))).toBeCloseTo(1, 3);
  });

  test('theoretical yield for hydrogen combustion', () => {
    const result = theoreticalYield({
      reactantMass: 4,
      reactantMolarMass: molarMass('H2'),
      stoichReactant: 2,
      stoichProduct: 2,
      productMolarMass: molarMass('H2O'),
    });

    expect(result.productMass).toBeCloseTo(35.7, 1);
  });
});
