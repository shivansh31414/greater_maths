

# greater_maths

A **CLI + npm scientific computation toolkit** for Node.js that supports advanced mathematical, statistical, and engineering calculations. Designed to be **extensible, well-tested, and contributor-friendly**, this package helps developers, students, and researchers perform complex scientific computations directly from the command line or within Node.js projects.

---

## ✨ Features
- **Core Math**: Complex numbers, linear algebra, calculus (derivatives, integrals).
- **Probability & Statistics**: Normal, Poisson, Binomial distributions; regression and curve fitting.
- **Numerical Methods**: Root finding, numerical integration/differentiation, ODE solvers.
- **Vector Calculus**: Gradients, divergence, curl.
- **Engineering Modules**: Circuit analysis, chemical stoichiometry, unit conversions.
- **Usability Enhancements**:
  - Plugin system for domain-specific formulas.
  - LaTeX export for equations/results.
  - Graphing support via JS plotting libraries.

---

## 🚀 Installation
```bash
npm install -g greater_maths
```

Or add it to your project:
```bash
npm install greater_maths
```

---

## 🖥️ Usage
### CLI
```bash
greater_maths calc "integrate(sin(x), x)"
greater_maths matrix "det([[1,2],[3,4]])"
greater_maths stats "normalPDF(0, mean=0, sd=1)"
```

### Node.js API
```javascript
const gm = require('greater_maths');

// Example: Matrix determinant
console.log(gm.matrix.det([[1,2],[3,4]]));

// Example: Numerical integration
console.log(gm.calc.integrate("sin(x)", "x"));
```

---

## 🧪 Testing
Run unit tests:
```bash
npm test
```

Coverage report:
```bash
npm run coverage
```

---

## 🛠 Development
- **Linting**: ESLint + Prettier
- **Testing**: Jest + property-based tests (`fast-check`)
- **CI/CD**: GitHub Actions pipeline
  - Lint + test on PRs
  - Coverage badge
  - Auto-publish to npm on tagged releases

---

## 📚 Documentation
- API reference generated with **Typedoc**
- Tutorials and scientific examples included in `/docs`
- Contribution guidelines in `CONTRIBUTING.md`

---

## 🤝 Contributing
We welcome contributions!  
- Fork the repo  
- Create a feature branch (`feat: add FFT support`)  
- Write tests + docs  
- Submit a PR with clear commit messages  

See `[Looks like the result wasn't safe to show. Let's switch things up and try something else!]` for details.

---
