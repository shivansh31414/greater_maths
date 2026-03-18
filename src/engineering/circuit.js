const { Complex } = require('../core/complex');

function ensureFinite(value, label) {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number.`);
  }
}

function ohmsLaw({ voltage, current, resistance }) {
  const values = [voltage, current, resistance].filter((v) => v !== undefined);
  if (values.length !== 2) {
    throw new Error('Provide exactly two of voltage, current, and resistance.');
  }

  if (voltage !== undefined) ensureFinite(voltage, 'voltage');
  if (current !== undefined) ensureFinite(current, 'current');
  if (resistance !== undefined) ensureFinite(resistance, 'resistance');

  if (voltage === undefined) {
    return {
      voltage: current * resistance,
      current,
      resistance,
    };
  }

  if (current === undefined) {
    if (resistance === 0) {
      throw new Error('resistance must be non-zero when solving for current.');
    }

    return {
      voltage,
      current: voltage / resistance,
      resistance,
    };
  }

  if (current === 0) {
    throw new Error('current must be non-zero when solving for resistance.');
  }

  return {
    voltage,
    current,
    resistance: voltage / current,
  };
}

function impedanceSeriesRLC(resistance, inductance, capacitance, frequency) {
  ensureFinite(resistance, 'resistance');
  ensureFinite(inductance, 'inductance');
  ensureFinite(capacitance, 'capacitance');
  ensureFinite(frequency, 'frequency');

  if (capacitance <= 0 || frequency <= 0) {
    throw new Error('capacitance and frequency must be positive.');
  }

  const omega = 2 * Math.PI * frequency;
  const reactance = omega * inductance - 1 / (omega * capacitance);
  const impedance = new Complex(resistance, reactance);

  return {
    impedance,
    magnitude: impedance.abs(),
    phaseRadians: Math.atan2(reactance, resistance),
  };
}

module.exports = {
  ohmsLaw,
  impedanceSeriesRLC,
};
