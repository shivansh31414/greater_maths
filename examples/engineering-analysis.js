#!/usr/bin/env node
/**
 * Example: Engineering - Circuit Analysis
 * Demonstrates circuit analysis and stoichiometry calculations
 */

const scientificToolkit = require('../src/index');

const { engineering, latex } = scientificToolkit;

console.log('=== Circuit Analysis: RLC Circuit ===\n');

// Calculate impedance of a series RLC circuit
const R = 100; // 100 ohm resistor
const L = 0.5; // 0.5 henry inductor
const C = 1e-6; // 1 microfarad capacitor
const f = 1000; // 1 kHz

console.log('Series RLC Circuit:');
console.log(`Resistance: ${R} Ω`);
console.log(`Inductance: ${L} H`);
console.log(`Capacitance: ${C * 1e6} μF`);
console.log(`Frequency: ${f} Hz\n`);

const impedance = engineering.circuit.impedanceSeriesRLC(R, L, C, f);
console.log(`Impedance Magnitude: ${impedance.magnitude.toFixed(2)} Ω`);
console.log(`Phase Angle: ${(impedance.phase * (180 / Math.PI)).toFixed(2)}°\n`);

// Ohm's Law
console.log("=== Ohm's Law: Solving for Unknown ===\n");

console.log('Given: Voltage (V) = 12V, Resistance (R) = 60Ω');
const solution = engineering.circuit.ohmsLaw({
  voltage: 12,
  resistance: 60,
});
console.log(`Calculated Current (I): ${solution.current.toFixed(4)} A\n`);

// Stoichiometry
console.log('=== Chemical Stoichiometry ===\n');

console.log('Example: Combustion of Methane');
console.log('CH4 + 2O2 -> CO2 + 2H2O\n');

// Calculate molar masses
const molMass_CH4 = engineering.chemistry.molarMass('CH4');
const molMass_O2 = engineering.chemistry.molarMass('O2');
const molMass_CO2 = engineering.chemistry.molarMass('CO2');
const molMass_H2O = engineering.chemistry.molarMass('H2O');

console.log('Molar Masses:');
console.log(`CH4: ${molMass_CH4.toFixed(2)} g/mol`);
console.log(`O2: ${molMass_O2.toFixed(2)} g/mol`);
console.log(`CO2: ${molMass_CO2.toFixed(2)} g/mol`);
console.log(`H2O: ${molMass_H2O.toFixed(2)} g/mol\n`);

// Calculate theoretical yield
console.log('Stoichiometric Calculation:');
console.log('Starting with 16 g of CH4 and excess O2\n');

const moles_CH4 = engineering.chemistry.gramsToMoles(16, molMass_CH4);
console.log(`Moles of CH4: ${moles_CH4.toFixed(4)} mol`);

const yieldCO2 = engineering.chemistry.theoreticalYield({
  reactantMass: 16,
  reactantMolarMass: molMass_CH4,
  stoichReactant: 1, // 1 CH4
  stoichProduct: 1, // 1 CO2
  productMolarMass: molMass_CO2,
});

const yieldH2O = engineering.chemistry.theoreticalYield({
  reactantMass: 16,
  reactantMolarMass: molMass_CH4,
  stoichReactant: 1, // 1 CH4
  stoichProduct: 2, // 2 H2O
  productMolarMass: molMass_H2O,
});

console.log(`Theoretical yield of CO2: ${yieldCO2.toFixed(2)} g`);
console.log(`Theoretical yield of H2O: ${yieldH2O.toFixed(2)} g\n`);

// Export as LaTeX
const latexExporter = latex.LaTeXExporter;
const engineeringResults = {
  Z: impedance.magnitude,
  'M_{CH4}': molMass_CH4,
  'm_{CO2}': yieldCO2,
};

console.log('LaTeX Export:');
console.log(latexExporter.formatResults(engineeringResults, '', 2));
