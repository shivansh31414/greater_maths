# Changelog

All notable changes to the scientific-toolkit project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-03-19

### Added

- **Plugin System**: Extensible architecture for domain-specific formulas
  - `Plugin` class for formula registration and metadata
  - `PluginManager` for plugin lifecycle management
  - Astrophysics plugin with 6 formulas (orbital mechanics, black holes, cosmology)
  - Bioinformatics plugin with 7 formulas (sequence analysis, population genetics)

- **LaTeX Export Module**: Convert calculations to publication-ready LaTeX
  - Expression-to-LaTeX conversion
  - Equation environments, matrices, fractions, subscripts, superscripts
  - Complex numbers and polynomial formatting
  - Complete LaTeX document generation

- **Example Scripts**: Practical demonstrations for scientists
  - `examples/orbital-mechanics.js`: Astrophysics
  - `examples/bioinformatics-analysis.js`: DNA/protein analysis
  - `examples/numerical-methods.js`: ODE solving
  - `examples/engineering-analysis.js`: Circuit analysis

- **Documentation**: CODE_OF_CONDUCT.md, expanded CONTRIBUTING.md, comprehensive README
- **Integration Tests**: 50+ new tests for plugins and LaTeX export
- **Dependencies**: Added plotly.js-dist-min, typedoc, typedoc-plugin-markdown

## [Unreleased]

### Added

- Graphing support using Plotly.js
- API documentation generated with TypeDoc
- Enhanced CI/CD pipeline with GitHub Pages documentation deployment
- Automated release notes generation from Conventional Commits

## [1.0.0] - 2024-01-XX

### Added

- Initial release of scientific-toolkit
- Core mathematics modules (complex numbers, linear algebra, calculus)
- Numerical methods (Newton-Raphson, ODE solvers)
- Vector calculus operations (gradient, divergence, curl)
- Regression and curve fitting
- Engineering modules (circuit analysis, stoichiometry)
- Probability distributions (normal, Poisson, binomial)
- Unit conversion with dimensional analysis
- Command-line interface (CLI)
- Comprehensive test suite with Jest
- ESLint and Prettier for code quality
- GitHub Actions CI/CD pipeline
- MIT License

[Unreleased]: https://github.com/shivansh31414/greater_maths/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/shivansh31414/greater_maths/releases/tag/v1.0.0
