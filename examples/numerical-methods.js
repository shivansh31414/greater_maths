#!/usr/bin/env node
/**
 * Example: Numerical Methods - ODE Solver
 * Demonstrates ODE solving and curve fitting
 */

const scientificToolkit = require('../src/index');

const { numerical, regression, latex } = scientificToolkit;

console.log('=== Numerical ODE Solver: Exponential Growth ===\n');

// Define the ODE: dy/dt = y (exponential growth)
const dydx = (y) => y;

console.log('Solving ODE: dy/dt = y');
console.log('Initial condition: y(0) = 1\n');

// Solve using Euler method
console.log('Euler Method (step size = 0.1):');
const yEuler = numerical.solveODEEuler(dydx, 0, 1, 0.1, 10);
console.log(`Solution at t=1: ${yEuler.toFixed(6)}`);
console.log(`Expected (e): ${Math.E.toFixed(6)}`);
console.log(`Error: ${Math.abs(yEuler - Math.E).toFixed(6)}\n`);

// Solve using RK4 method (more accurate)
console.log('Runge-Kutta 4 Method (step size = 0.1):');
const yRK4 = numerical.solveODERungeKutta4(dydx, 0, 1, 0.1, 10);
console.log(`Solution at t=1: ${yRK4.toFixed(6)}`);
console.log(`Expected (e): ${Math.E.toFixed(6)}`);
console.log(`Error: ${Math.abs(yRK4 - Math.E).toFixed(6)}\n`);

// Newton-Raphson root finding
console.log('=== Newton-Raphson: Finding Roots ===\n');
console.log('Finding root of f(x) = x^2 - 4 (expected: 2)');

const f = (x) => x * x - 4;
const root = numerical.newtonRaphson(f, 3, {
  tolerance: 1e-6,
  maxIterations: 20,
});

console.log(`Root found: ${root.toFixed(6)}\n`);

// Polynomial regression
console.log('=== Polynomial Curve Fitting ===\n');

// Generate noisy data from y = 0.5*x^2 - 2*x + 1
const x = [0, 1, 2, 3, 4, 5];
const y = [1, -0.4, 0, 1.5, 5, 9.5];

console.log('Fitting polynomial to data points:');
x.forEach((xi, i) => {
  console.log(`(${xi}, ${y[i]})`);
});

const linearFit = regression.linearLeastSquares(x, y);
console.log(
  `\nLinear Fit: y = ${linearFit.slope.toFixed(4)}*x + ${linearFit.intercept.toFixed(4)}`
);

const quadraticFit = regression.polynomialFit(x, y, 2);
console.log(`Quadratic Fit: coefficients = [${quadraticFit.map((c) => c.toFixed(4)).join(', ')}]`);
console.log(
  `Formula: y = ${quadraticFit[0].toFixed(4)}*x^2 + ${quadraticFit[1].toFixed(4)}*x + ${quadraticFit[2].toFixed(4)}`
);

// Export as LaTeX
const latexExporter = latex.LaTeXExporter;
console.log('\nLaTeX Equation (Quadratic):');
const polyLatex = latexExporter.polynomialToLatex(quadraticFit);
const equation = latexExporter.createEquation(polyLatex, 'equation', 'quadratic-fit');
console.log(equation);
