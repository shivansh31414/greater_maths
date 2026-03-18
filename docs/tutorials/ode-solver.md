# Tutorial: Solving an ODE with RK4

This tutorial solves the initial value problem:

- $\frac{dy}{dx} = y$
- $y(0) = 1$

The analytical solution is $y=e^x$, so at $x=1$ we expect $e \approx 2.71828$.

## Example

```js
const toolkit = require('scientific-toolkit');

const points = toolkit.numerical.solveODERungeKutta4(
  (x, y) => y,
  0,
  1,
  0.1,
  10
);

const last = points[points.length - 1];
console.log(last); // { x: 1, y: ~2.71828 }
```

## Notes

- Euler is faster but less accurate.
- RK4 is a good default for many smooth ODEs.
- Decrease step size for tighter error bounds.
