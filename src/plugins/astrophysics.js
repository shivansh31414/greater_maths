/**
 * Astrophysics Plugin for scientific-toolkit
 * Domain-specific calculations for astrophysics
 */

const { Plugin } = require('./loader');

// Fundamental constants
const G = 6.6743e-11; // Gravitational constant (m^3 kg^-1 s^-2)
const c = 299792458; // Speed of light (m/s)

/**
 * Calculate orbital velocity
 * @param {number} M - Mass of central body (kg)
 * @param {number} r - Orbital radius (m)
 * @returns {number} Orbital velocity (m/s)
 */
function orbitalVelocity(M, r) {
  if (M <= 0 || r <= 0) {
    throw new Error('Mass and radius must be positive');
  }
  return Math.sqrt((G * M) / r);
}

/**
 * Calculate escape velocity
 * @param {number} M - Mass of celestial body (kg)
 * @param {number} R - Radius of celestial body (m)
 * @returns {number} Escape velocity (m/s)
 */
function escapeVelocity(M, R) {
  if (M <= 0 || R <= 0) {
    throw new Error('Mass and radius must be positive');
  }
  return Math.sqrt((2 * G * M) / R);
}

/**
 * Calculate Schwarzschild radius (event horizon of black hole)
 * @param {number} M - Mass in kg
 * @returns {number} Schwarzschild radius (m)
 */
function schwarzschildRadius(M) {
  if (M <= 0) {
    throw new Error('Mass must be positive');
  }
  return (2 * G * M) / (c * c);
}

/**
 * Apply redshift correction (Doppler shift formula for light)
 * @param {number} lambda_0 - Rest wavelength (m)
 * @param {number} v - Radial velocity (m/s, positive = receding)
 * @returns {number} Observed wavelength (m)
 */
function dopplerRedshift(lambda_0, v) {
  if (lambda_0 <= 0) {
    throw new Error('Wavelength must be positive');
  }
  const z = v / c; // Redshift parameter
  return lambda_0 * (1 + z);
}

/**
 * Calculate luminosity distance
 * @param {number} redshift - Cosmological redshift
 * @returns {number} Luminosity distance (m, assuming flat universe)
 */
function luminosityDistance(redshift) {
  if (redshift < 0) {
    throw new Error('Redshift must be non-negative');
  }
  const c_cMpc = 299792.458; // Speed of light in km/s
  const H0 = 67.4; // Hubble constant (km/s/Mpc) - Planck 2018
  return (c_cMpc / H0) * (redshift + (redshift * redshift) / 2); // Simplified for small z
}

/**
 * Calculate stellar surface temperature from luminosity and radius
 * Stefan-Boltzmann law: L = 4*pi*R^2*sigma*T^4
 * @param {number} L - Luminosity (W)
 * @param {number} R - Radius (m)
 * @returns {number} Surface temperature (K)
 */
function stellarTemperature(L, R) {
  if (L <= 0 || R <= 0) {
    throw new Error('Luminosity and radius must be positive');
  }
  const sigma = 5.670374419e-8; // Stefan-Boltzmann constant
  return Math.pow(L / (4 * Math.PI * R * R * sigma), 0.25);
}

// Create the plugin
const astrophysicsPlugin = new Plugin(
  'astrophysics',
  '1.0.0',
  'Astrophysics formulas for orbital mechanics, black holes, and cosmology',
  {}
);

// Register formulas
astrophysicsPlugin.registerFormula('orbitalVelocity', orbitalVelocity, {
  description: 'Calculate orbital velocity around a massive body',
  params: [
    { name: 'M', description: 'Mass of central body (kg)' },
    { name: 'r', description: 'Orbital radius (m)' },
  ],
  returns: 'Orbital velocity (m/s)',
});

astrophysicsPlugin.registerFormula('escapeVelocity', escapeVelocity, {
  description: 'Calculate escape velocity from a celestial body',
  params: [
    { name: 'M', description: 'Mass (kg)' },
    { name: 'R', description: 'Radius (m)' },
  ],
  returns: 'Escape velocity (m/s)',
});

astrophysicsPlugin.registerFormula('schwarzschildRadius', schwarzschildRadius, {
  description: 'Calculate Schwarzschild radius (event horizon of black hole)',
  params: [{ name: 'M', description: 'Mass (kg)' }],
  returns: 'Schwarzschild radius (m)',
});

astrophysicsPlugin.registerFormula('dopplerRedshift', dopplerRedshift, {
  description: 'Apply Doppler shift correction to wavelength',
  params: [
    { name: 'lambda_0', description: 'Rest wavelength (m)' },
    { name: 'v', description: 'Radial velocity (m/s)' },
  ],
  returns: 'Observed wavelength (m)',
});

astrophysicsPlugin.registerFormula('luminosityDistance', luminosityDistance, {
  description: 'Calculate cosmological luminosity distance',
  params: [{ name: 'redshift', description: 'Cosmological redshift' }],
  returns: 'Luminosity distance (m)',
});

astrophysicsPlugin.registerFormula('stellarTemperature', stellarTemperature, {
  description: 'Calculate stellar surface temperature from luminosity and radius',
  params: [
    { name: 'L', description: 'Luminosity (W)' },
    { name: 'R', description: 'Radius (m)' },
  ],
  returns: 'Surface temperature (K)',
});

module.exports = astrophysicsPlugin;
