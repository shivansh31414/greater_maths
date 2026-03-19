# scientific-toolkit

[![CI](https://github.com/shivansh31414/greater_maths/actions/workflows/ci.yml/badge.svg)](https://github.com/shivansh31414/greater_maths/actions/workflows/ci.yml)
[![Coverage](https://codecov.io/gh/shivansh31414/greater_maths/branch/main/graph/badge.svg)](https://codecov.io/gh/shivansh31414/greater_maths)
[![npm version](https://badge.fury.io/js/scientific-toolkit.svg)](https://badge.fury.io/js/scientific-toolkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive Node.js scientific computation framework with plugin system, CLI interface, and extensive API for scientists, engineers, and researchers. Features domain-specific plugins for astrophysics and bioinformatics, LaTeX export, and interactive examples.

## Features

### Core Mathematics

- **Complex Numbers**: Arithmetic operations, square root, trigonometric functions
- **Linear Algebra**: Matrix multiplication, determinant calculation, Gaussian elimination
- **Calculus**: Numerical derivatives (central difference), integrals (Simpson's rule, trapezoid)

### Numerical Methods

- **Root Finding**: Newton-Raphson method with numerical/analytical derivatives
- **ODE Solvers**: Euler and 4th-order Runge-Kutta for initial value problems
- **Numerical Differentiation & Integration**: Flexible step-size control

### Vector Calculus

- **Gradient**: Numerical gradient of scalar fields
- **Divergence**: Vector field divergence computation
- **Curl**: Curl operator for 3D vector fields

### Regression & Fitting

- **Linear Regression**: Least squares with R² calculation
- **Polynomial Fitting**: Arbitrary degree fitting with normal equations

### Engineering Modules

- **Circuit Analysis**: Ohm's law solver, RLC impedance calculations with complex numbers
- **Stoichiometry**: Molar mass parser, theoretical yield calculations, chemical reactions

### Statistical Distributions

- **Normal Distribution**: PDF and CDF with configurable mean/std dev
- **Poisson Distribution**: PMF for rare event modeling
- **Binomial Distribution**: PMF for counting successes

### Advanced Features

- **Plugin System**: Extensible architecture for domain-specific formulas
  - Astrophysics plugin: Orbital mechanics, black holes, cosmology
  - Bioinformatics plugin: Sequence analysis, population genetics
- **LaTeX Export**: Convert equations, matrices, and results to LaTeX format
- **CLI Interface**: Command-line access to all toolkit functionality
- **Unit Conversion**: Dimensional analysis with automatic unit conversion

### Development & Deployment

- **Code Quality**: ESLint (v8) + Prettier formatting
- **Testing**: Jest with 100+ test cases and coverage reporting
- **CI/CD**: GitHub Actions with Node.js 16/18/20 matrix
- **Documentation**: TypeDoc API docs, comprehensive tutorials, example scripts

## Installation

```bash
npm install scientific-toolkit
```

For global CLI use:

```bash
npm install -g scientific-toolkit
```

## Quick Start

### Node.js API

```js
const toolkit = require('scientific-toolkit');

// Complex numbers
const a = new toolkit.core.Complex(2, 3);
const b = new toolkit.core.Complex(4, -1);
console.log(a.mul(b).toString()); // 11.000000+10.000000i

// Plugins for domain-specific formulas
const { plugins } = toolkit;
const manager = new plugins.PluginManager();
manager.register(plugins.builtin.astrophysics);

// Astrophysics: orbital velocity
const v = manager.executeFormula('astrophysics', 'orbitalVelocity', 1.989e30, 1.496e11);
console.log(v); // ~29,815 m/s

// LaTeX export
const { latex } = toolkit;
const latexExporter = latex.LaTeXExporter;
console.log(latexExporter.formatResult('v', v, 'm/s', 2));
// $ v = 29815.00 \, \text{m/s} $
```

### CLI Usage

```bash
# Complex number operations
scientific-toolkit complex add 1 2 3 4
scientific-toolkit complex mul 2 3 4 -1

# Matrix operations
scientific-toolkit matrix det "[[1,2],[3,4]]"

# Numerical methods
scientific-toolkit calculus integral "Math.sin(x)" 0 3.14159 1000

# Probability
scientific-toolkit probability normal-pdf 0 0 1

# Units
scientific-toolkit convert 36 km/h m/s
```

### Examples

Run practical examples for scientists and engineers:

```bash
node examples/orbital-mechanics.js
node examples/bioinformatics-analysis.js
node examples/numerical-methods.js
node examples/engineering-analysis.js
```

See [examples/README.md](examples/README.md) for detailed documentation.

## API Documentation

Complete API reference:

```bash
npm run docs
```

Generates TypeDoc documentation in `docs/api/`.

## Development

```bash
npm install
npm run lint          # ESLint + Prettier
npm run format        # Auto-fix formatting
npm test              # Jest with coverage
npm run coverage      # Generate coverage report
npm run docs          # Generate TypeDoc API docs
```

## Plugin System

### Built-in Plugins

#### Astrophysics Plugin

```js
const manager = new plugins.PluginManager();
manager.register(plugins.builtin.astrophysics);

manager.executeFormula('astrophysics', 'orbitalVelocity', M, r);
manager.executeFormula('astrophysics', 'escapeVelocity', M, R);
manager.executeFormula('astrophysics', 'schwarzschildRadius', M);
manager.executeFormula('astrophysics', 'dopplerRedshift', lambda_0, v);
manager.executeFormula('astrophysics', 'stellarTemperature', L, R);
```

#### Bioinformatics Plugin

```js
const manager = new plugins.PluginManager();
manager.register(plugins.builtin.bioinformatics);

manager.executeFormula('bioinformatics', 'gcContent', sequence);
manager.executeFormula('bioinformatics', 'transcribeDNA', dnaSeq);
manager.executeFormula('bioinformatics', 'reverseComplement', seq);
manager.executeFormula('bioinformatics', 'hardyWeinbergFrequencies', p);
```

### Creating Custom Plugins

```js
const { plugins } = toolkit;
const { Plugin, PluginManager } = plugins;

const myPlugin = new Plugin('myPlugin', '1.0.0', 'My domain formulas', {});
myPlugin.registerFormula('myFormula', (x, y) => x + y * 2, {
  description: 'My custom formula',
  params: [{ name: 'x' }, { name: 'y' }],
  returns: 'x + 2y',
});

const manager = new PluginManager();
manager.register(myPlugin);
const result = manager.executeFormula('myPlugin', 'myFormula', 5, 3); // 11
```

## LaTeX Export

Convert calculations to publication-ready LaTeX:

```js
const { latex } = toolkit;
const exp = latex.LaTeXExporter;

// Expressions
console.log(exp.expressionToLatex('sqrt(x) + pi*r^2'));

// Results
console.log(exp.formatResult('E', 3.14159, 'J', 5));

// Matrices
const matrix = [
  [1, 2],
  [3, 4],
];
console.log(exp.matrixToLatex(matrix, 'bmatrix'));

// Equations
console.log(exp.createEquation('E = mc^2', 'equation', 'einstein'));

// Documents
const content = 'My calculations...';
console.log(
  exp.createDocument(content, {
    title: 'Scientific Report',
    author: 'Jane Doe',
  })
);
```

## CI/CD Pipeline

### GitHub Actions

- **CI Workflow** (`.github/workflows/ci.yml`)
  - Runs on PR and push to `main`
  - Tests on Node.js 16, 18, 20
  - Coverage upload to Codecov
- **Publish Workflow** (`.github/workflows/publish.yml`)
  - Runs on GitHub release
  - Publishes to npm registry

### Required Secrets

- `NPM_TOKEN`: npm publish automation token

## Conventional Commits

Follow clean, atomic commit patterns:

- `feat(plugins): add plugin system with astrophysics and bioinformatics`
- `feat(latex): implement LaTeX export for equations and results`
- `test: add integration tests for plugins and LaTeX export`
- `docs: add examples and API documentation`
- `ci: configure GitHub Actions for docs deployment`

## Tutorials

- [ODE Solver Tutorial](docs/tutorials/ode-solver.md): Solving differential equations
- [Regression Fitting Tutorial](docs/tutorials/regression-fitting.md): Curve fitting workflows
- [Examples Directory](examples/): Practical use cases for scientists and engineers

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

MIT License - see [LICENSE](LICENSE) for details.
