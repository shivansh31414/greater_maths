# Tutorial: Linear and Polynomial Regression

This tutorial fits two data models:

- Linear least squares
- Polynomial curve fit (degree 2)

## Linear Least Squares

```js
const toolkit = require('scientific-toolkit');

const x = [0, 1, 2, 3, 4, 5];
const y = [1.0, 3.0, 5.0, 7.1, 8.9, 11.2];

const fit = toolkit.regression.linearLeastSquares(x, y);
console.log(fit.slope, fit.intercept, fit.rSquared);
console.log(fit.predict(6));
```

## Polynomial Fit

```js
const toolkit = require('scientific-toolkit');

const x = [-2, -1, 0, 1, 2, 3];
const y = x.map((v) => v * v + 2 * v + 1);

const poly = toolkit.regression.polynomialFit(x, y, 2);
console.log(poly.coefficients); // [~1, ~2, ~1]
console.log(poly.rSquared);
```

## Notes

- Use linear regression for approximately linear trends.
- Use polynomial fitting for curved trends when degree is known or validated.
- Always check residuals and $R^2$ before relying on the model.
