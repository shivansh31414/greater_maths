#!/usr/bin/env node
/**
 * Example: Orbital Mechanics - Earth Satellite Calculations
 * Demonstrates usage of astrophysics plugin for orbital calculations
 */

const scientificToolkit = require('../src/index');

const { plugins, latex } = scientificToolkit;
const manager = new plugins.PluginManager();
manager.register(plugins.builtin.astrophysics);

console.log('=== Satellite Orbital Mechanics ===\n');

// Constants
const M_earth = 5.972e24; // kg
const R_earth = 6.371e6; // meters
const geostationary_orbit = 42164000; // meters from Earth's center

console.log('Calculating escape velocity from Earth:');
const v_escape = manager.executeFormula('astrophysics', 'escapeVelocity', M_earth, R_earth);
console.log(`Escape Velocity: ${v_escape.toFixed(2)} m/s (${(v_escape / 1000).toFixed(2)} km/s)\n`);

console.log('Calculating orbital velocity for geostationary orbit:');
const v_geo = manager.executeFormula(
  'astrophysics',
  'orbitalVelocity',
  M_earth,
  geostationary_orbit
);
console.log(`Orbital Velocity (Geostationary): ${v_geo.toFixed(2)} m/s\n`);

console.log('Calculating orbital velocity at ISS altitude (~400 km):');
const ISS_altitude = 400000;
const v_iss = manager.executeFormula(
  'astrophysics',
  'orbitalVelocity',
  M_earth,
  R_earth + ISS_altitude
);
console.log(`Orbital Velocity (ISS): ${v_iss.toFixed(2)} m/s\n`);

// Export as LaTeX
const latexExporter = latex.LaTeXExporter;
const results = {
  'v_{escape}': v_escape,
  'v_{geo}': v_geo,
  'v_{ISS}': v_iss,
};

console.log('LaTeX Export:');
console.log(latexExporter.formatResults(results, 'm/s', 2));
