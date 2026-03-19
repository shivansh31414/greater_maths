# Contributing

Thanks for contributing to `scientific-toolkit`! This document provides guidelines for contributing to the project.

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for our community standards.

## Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/shivansh31414/greater_maths.git
   cd greater_maths
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Verify setup by running quality checks:
   ```bash
   npm run lint
   npm test
   npm run coverage
   ```

## Branch & PR Workflow

### Creating Feature Branches

1. Create a descriptive feature branch from `main`:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feat/feature-name
   ```

2. Branch naming conventions:
   - `feat/feature-name`: New features
   - `fix/bug-name`: Bug fixes
   - `docs/description`: Documentation improvements
   - `test/focus`: Test additions
   - `refactor/detail`: Code refactoring
   - `ci/change`: CI/CD pipeline updates
   - `chore/task`: Maintenance tasks

### Making Commits

Keep commits **atomic and reviewer-friendly**:

```bash
git add <specific-files>
git commit -m "type(scope): descriptive message"
```

**Commit Message Format:**

```
type(scope): subject

Body with more context (optional)

Closes #123
```

**Example:**

```
feat(plugins): add astrophysics plugin with orbital mechanics

- Implement orbital velocity calculation
- Implement escape velocity calculation
- Add comprehensive plugin documentation
- Include 6 domain-specific formulas

Closes #15
```

### Opening Pull Requests

1. Push your branch:

   ```bash
   git push origin feat/feature-name
   ```

2. Open a PR on GitHub targeting `main`

3. Fill in the PR template with:
   - **Description**: What does this PR accomplish?
   - **Related Issues**: Link any related issues
   - **Testing**: Describe how to test the changes
   - **Checklist**: Verify all items below:
     - [ ] Code follows style guidelines (ESLint passes)
     - [ ] Formatted with Prettier
     - [ ] New tests added/updated
     - [ ] Documentation updated
     - [ ] Conventional Commits used
     - [ ] No merge conflicts

4. Address reviewer feedback with additional commits

### Merging PRs

**Requirements Before Merge:**

- ✅ All CI checks pass (lint, tests, coverage)
- ✅ At least one review approval
- ✅ No merge conflicts
- ✅ Clean commit history with Conventional Commits

**Merge Process:**

1. Use "Create a merge commit" (not squash or rebase) to preserve commit history
2. Merge message format: `Merge pull request #N: Short description`
3. Delete the feature branch after merge

Example merge message:

```
Merge pull request #2: LaTeX export for equations and results

- feat: implement LaTeX export for equations and results
```

### After Merge

```bash
# Delete local feature branch
git branch -d feat/feature-name

# Delete remote feature branch (or GitHub UI)
git push origin --delete feat/feature-name

# Sync local main
git checkout main
git pull origin main
```

## Conventional Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

**Format:**

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

**Types:**

- **feat**: A new feature
- **fix**: A bug fix
- **test**: Adding or updating tests
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code changes that don't fix bugs or add features
- **perf**: Code changes that improve performance
- **ci**: Changes to CI/CD workflow
- **chore**: Other changes that don't modify src or test files

**Examples:**

```
feat(plugins): add plugin system with astrophysics and bioinformatics

feat(latex): implement LaTeX export for equations and results

test: add integration tests for plugin system

docs: update README with plugin examples

fix(plugins): handle empty formula list edge case

ci: configure GitHub Actions for Node 16/18/20
```

## Testing Guidelines

### Add Tests for All Changes

1. **Unit Tests**: Test individual functions and classes
   - Located in `tests/` directory
   - File naming: `*.test.js`
   - Use Jest and follow async/await patterns

2. **Integration Tests**: Test feature interactions
   - Test plugin loading and execution
   - Test LaTeX export with real calculations
   - Test CLI command flows

3. **Test Coverage**:
   - Aim for >90% code coverage
   - Test edge cases (empty inputs, boundary values, invalid types)
   - Include realistic scientific examples

### Run Tests Locally

```bash
npm test                 # Run all tests
npm test -- --testNamePattern="Plugin"  # Run specific tests
npm run coverage         # Generate coverage report
```

### CI/CD Test Matrix

Tests run on:

- Node.js 16
- Node.js 18
- Node.js 20

Coverage uploaded to Codecov on Node.js 20 only.

## Pull Request Guidelines

### Keep PRs Focused

- ✅ DO: One feature per PR (orbital mechanics plugin)
- ✅ DO: Related changes in single PR (plugin + tests + docs)
- ❌ DON'T: Multiple unrelated features in one PR
- ❌ DON'T: Mix refactoring with new features

### Documentation Requirements

1. **README.md**: API examples and usage patterns
2. **Code Comments**: Complex algorithms and edge cases
3. **Examples**: Practical use cases in `/examples`
4. **Tutorials**: Detailed workflows in `/docs/tutorials`
5. **Inline JSDoc**: Function parameters and return values

### Quality Checks Before Submission

```bash
# Format code
npm run format

# Lint check
npm run lint

# Run all tests
npm test

# Check coverage
npm run coverage

# Verify no uncommitted changes
git status
```

## Branch Cleanliness & Hygiene

### Keep Repository Clean

1. **Delete merged branches**:

   ```bash
   git branch -d <branch-name>
   git push origin --delete <branch-name>
   ```

2. **Update .gitignore** for new build artifacts:
   - Node modules, coverage, docs build outputs
   - Editor configs (.vscode, .idea)
   - System files (_.swp, _.log)

3. **Avoid Force Pushes**:
   - ❌ Don't use `git push --force` on shared branches
   - ✅ DO use `git push` with clean linear history

4. **Keep Commits Atomic**:
   - One logical change per commit
   - Commits should be reviewable individually
   - Tests should pass after each commit

## Release Process

### Version Updates

- Update `package.json` version following Semantic Versioning
- Update `CHANGELOG.md` with new features, fixes, and breaking changes
- Features are aggregated from Conventional Commits

### Creating a Release

1. Create a release branch: `git checkout -b release/v1.1.0`
2. Update version and changelog
3. Open PR targeting `main`
4. After merge, create GitHub Release
5. CI automatically publishes to npm

## Reporting Issues

Use GitHub Issues to report:

1. **Bug Reports**:
   - Minimal reproducible example
   - Expected vs actual behavior
   - Node.js version and platform

2. **Feature Requests**:
   - Use case and motivation
   - Proposed API or design
   - Related issues or discussions

3. **Documentation Issues**:
   - Missing or unclear content
   - Links to specific pages

## Questions & Discussions

- GitHub Discussions: For general questions and ideas
- GitHub Issues: For bugs and concrete feature requests
- Pull Requests: For code contributions

## Additional Resources

- [README.md](README.md): Package overview and quick start
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md): Community standards
- [CHANGELOG.md](CHANGELOG.md): Release history
- [examples/README.md](examples/README.md): Practical examples
- [API Documentation](docs/api): Generated TypeDoc reference

---

**Thank you for making scientific-toolkit better!** 🚀
