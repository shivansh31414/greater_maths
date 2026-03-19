# Examples

This folder contains practical examples demonstrating the capabilities of scientific-toolkit for scientists and engineers.

## Running Examples

All examples can be run directly from the command line:

```bash
node examples/orbital-mechanics.js
node examples/bioinformatics-analysis.js
node examples/numerical-methods.js
node examples/engineering-analysis.js
```

## Example 1: Orbital Mechanics

**File:** `orbital-mechanics.js`

Demonstrates astrophysics plugin for calculating orbital velocities and escape velocities.

**Key Concepts:**

- Orbital velocity calculations for Earth satellites
- Escape velocity computation
- LaTeX export of results

**Use Cases:**

- Satellite mission planning
- Orbital mechanics education
- Space mission calculations

## Example 2: Bioinformatics Analysis

**File:** `bioinformatics-analysis.js`

Demonstrates bioinformatics plugin for DNA/protein sequence analysis.

**Key Concepts:**

- GC content calculation
- DNA to RNA transcription
- Reverse complement computation
- Amino acid composition analysis
- Hardy-Weinberg equilibrium calculations

**Use Cases:**

- Genomics research
- Protein engineering
- Population genetics analysis

## Example 3: Numerical Methods

**File:** `numerical-methods.js`

Demonstrates numerical methods for solving ODEs and fitting curves.

**Key Concepts:**

- Euler method for ODE solving
- Runge-Kutta 4th order integration
- Newton-Raphson root finding
- Polynomial regression and curve fitting
- LaTeX equation generation

**Use Cases:**

- Differential equation modeling
- Data fitting and analysis
- Scientific computation

## Example 4: Engineering Analysis

**File:** `engineering-analysis.js`

Demonstrates circuit analysis and chemical stoichiometry calculations.

**Key Concepts:**

- RLC circuit impedance calculations
- Ohm's law solving
- Molar mass calculations
- Theoretical yield computation
- Chemical reaction stoichiometry

**Use Cases:**

- Circuit design and analysis
- Chemical process calculations
- Engineering problem solving

## Creating Your Own Examples

To create new examples:

1. Import the scientific-toolkit:

```javascript
const scientificToolkit = require('../src/index');
```

2. Access specific modules:

```javascript
const { plugins, numerical, regression, latex } = scientificToolkit;
```

3. Use the API and plugin system:

```javascript
const manager = new plugins.PluginManager();
manager.register(plugins.builtin.astrophysics);
const result = manager.executeFormula('astrophysics', 'orbitalVelocity', M, r);
```

4. Export results as LaTeX:

```javascript
const latexExporter = latex.LaTeXExporter;
console.log(latexExporter.formatResults(results, 'units', 4));
```

## API Documentation

For complete API documentation, see the main [README](../README.md) or run:

```bash
npm run docs
```

This generates TypeDoc documentation in the `docs/api` folder.

## Contributing

Have a great example idea? Contribute it! See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.
