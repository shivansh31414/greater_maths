# scientific-toolkit

A Node.js scientific computation package with a CLI and reusable API for core math, probability distributions, and unit conversion with dimensional analysis.

## Features

- Core math:
  - Complex number arithmetic
  - Linear algebra: matrix multiplication and determinant
  - Calculus: numerical derivatives and integrals
- Probability distributions:
  - Normal (PDF/CDF)
  - Poisson (PMF)
  - Binomial (PMF)
- Unit conversion with dimensional analysis
- CLI for quick calculations
- ESLint + Prettier + Jest
- GitHub Actions CI/CD for lint, tests, coverage, and npm publishing

## Installation

```bash
npm install scientific-toolkit
```

For global CLI use:

```bash
npm install -g scientific-toolkit
```

## Node.js API Usage

```js
const toolkit = require('scientific-toolkit');

const a = new toolkit.core.Complex(2, 3);
const b = new toolkit.core.Complex(4, -1);
console.log(a.mul(b).toString()); // 11.000000+10.000000i

console.log(
  toolkit.core.matrixMultiply(
    [
      [1, 2],
      [3, 4],
    ],
    [
      [5, 6],
      [7, 8],
    ]
  )
); // [[19,22],[43,50]]

console.log(
  toolkit.core.determinant([
    [1, 2],
    [3, 4],
  ])
); // -2
console.log(toolkit.core.derivative(Math.sin, 0)); // ~1
console.log(toolkit.core.integral(Math.sin, 0, Math.PI, 1000)); // ~2

console.log(toolkit.probability.normalPdf(0, 0, 1));
console.log(toolkit.probability.poissonPmf(3, 2.5));
console.log(toolkit.probability.binomialPmf(5, 10, 0.3));

console.log(toolkit.units.convert(36, 'km/h', 'm/s')); // 10
console.log(toolkit.units.analyzeDimensions('N')); // {L:1,M:1,T:-2,...}
```

## CLI Usage

```bash
scientific-toolkit complex add 1 2 3 4
scientific-toolkit complex mul 2 3 4 -1

scientific-toolkit matrix multiply "[[1,2],[3,4]]" "[[5,6],[7,8]]"
scientific-toolkit matrix det "[[1,2],[3,4]]"

scientific-toolkit calculus derivative "Math.sin(x)" 0
scientific-toolkit calculus integral "x*x" 0 2 1000

scientific-toolkit probability normal-pdf 0 0 1
scientific-toolkit probability normal-cdf 1.96 0 1
scientific-toolkit probability poisson 3 2.5
scientific-toolkit probability binomial 5 10 0.3

scientific-toolkit convert 100 cm m
scientific-toolkit convert 32 F C
scientific-toolkit analyze-unit "N/m^2"
```

## Development

Install dependencies:

```bash
npm install
```

Lint and format:

```bash
npm run lint
npm run format
```

Run tests and coverage:

```bash
npm test
npm run coverage
```

## CI/CD

- `.github/workflows/ci.yml`
  - Runs on every PR and pushes to `main`
  - Runs lint, tests, and coverage generation
  - Uploads coverage as a workflow artifact
- `.github/workflows/publish.yml`
  - Runs on published GitHub releases
  - Re-runs lint and tests
  - Publishes package to npm using `NPM_TOKEN`

Required secret:

- `NPM_TOKEN`: npm automation token with publish permissions

## Conventional Commits

Use clean, atomic commits such as:

- `feat(core): add complex, linear algebra, and calculus modules`
- `feat(probability): add normal, poisson, and binomial distributions`
- `feat(units): implement dimensional-analysis conversion engine`
- `feat(cli): add scientific-toolkit command interface`
- `test: add Jest coverage for modules and CLI edge cases`
- `chore(ci): add GitHub Actions for PR checks and npm publishing`
- `docs(readme): add installation and usage examples`
