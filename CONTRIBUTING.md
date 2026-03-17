# Contributing

Thanks for contributing to `scientific-toolkit`.

## Development Setup

1. Install dependencies:
   - `npm install`
2. Run quality checks:
   - `npm run lint`
   - `npm test`
   - `npm run coverage`

## Pull Request Guidelines

- Keep PRs focused and small.
- Include tests for new behavior and bug fixes.
- Update docs (`README.md`) for public API or CLI changes.
- Ensure CI is green before requesting review.

## Testing Guidelines

- Add or update Jest tests in `tests/` for all feature changes.
- Include edge cases such as floating-point precision, invalid inputs, and large matrices where relevant.
- Avoid flaky tests and time-sensitive assertions.

## Commit Message Guidelines

Use Conventional Commits and keep commits atomic:

- `feat:` for new functionality
- `fix:` for bug fixes
- `test:` for tests
- `docs:` for documentation
- `chore:` for maintenance and tooling
- `ci:` for workflow changes

Examples:

- `feat: add complex number operations`
- `feat: implement matrix determinant`
- `test: add unit tests for probability distributions`
- `chore: configure eslint and prettier`
- `ci: add GitHub Actions workflow for lint and tests`
- `docs: update README with CLI usage examples`
