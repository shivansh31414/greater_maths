function assertFinite(value, label) {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number.`);
  }
}

function assertFunction(fn, label) {
  if (typeof fn !== 'function') {
    throw new Error(`${label} must be a function.`);
  }
}

function numericalDerivative(fn, x, h = 1e-5) {
  assertFunction(fn, 'fn');
  assertFinite(x, 'x');
  assertFinite(h, 'h');

  if (h <= 0) {
    throw new Error('h must be positive.');
  }

  return (fn(x + h) - fn(x - h)) / (2 * h);
}

function numericalIntegration(fn, a, b, segments = 1000, method = 'simpson') {
  assertFunction(fn, 'fn');
  assertFinite(a, 'a');
  assertFinite(b, 'b');

  if (!Number.isInteger(segments) || segments <= 0) {
    throw new Error('segments must be a positive integer.');
  }

  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const sign = a <= b ? 1 : -1;

  if (method === 'trapezoid') {
    const h = (upper - lower) / segments;
    let sum = 0.5 * (fn(lower) + fn(upper));
    for (let i = 1; i < segments; i += 1) {
      sum += fn(lower + i * h);
    }
    return sign * sum * h;
  }

  if (method !== 'simpson') {
    throw new Error("method must be either 'simpson' or 'trapezoid'.");
  }

  const evenSegments = segments % 2 === 0 ? segments : segments + 1;
  const h = (upper - lower) / evenSegments;
  let sum = fn(lower) + fn(upper);

  for (let i = 1; i < evenSegments; i += 1) {
    sum += (i % 2 === 0 ? 2 : 4) * fn(lower + i * h);
  }

  return (sign * sum * h) / 3;
}

function newtonRaphson(fn, initialGuess, options = {}) {
  assertFunction(fn, 'fn');
  assertFinite(initialGuess, 'initialGuess');

  const {
    derivativeFn = null,
    tolerance = 1e-8,
    maxIterations = 100,
    derivativeStep = 1e-5,
  } = options;

  if (derivativeFn !== null && typeof derivativeFn !== 'function') {
    throw new Error('derivativeFn must be a function when provided.');
  }

  if (!Number.isFinite(tolerance) || tolerance <= 0) {
    throw new Error('tolerance must be a positive finite number.');
  }

  if (!Number.isInteger(maxIterations) || maxIterations <= 0) {
    throw new Error('maxIterations must be a positive integer.');
  }

  let x = initialGuess;

  for (let iteration = 0; iteration < maxIterations; iteration += 1) {
    const fx = fn(x);
    const dfx = derivativeFn ? derivativeFn(x) : numericalDerivative(fn, x, derivativeStep);

    if (!Number.isFinite(fx) || !Number.isFinite(dfx)) {
      throw new Error('Function or derivative evaluated to a non-finite value.');
    }

    if (Math.abs(dfx) < Number.EPSILON) {
      throw new Error('Derivative is too close to zero for stable Newton-Raphson steps.');
    }

    const nextX = x - fx / dfx;
    if (Math.abs(nextX - x) < tolerance || Math.abs(fx) < tolerance) {
      return {
        root: nextX,
        iterations: iteration + 1,
        converged: true,
      };
    }

    x = nextX;
  }

  return {
    root: x,
    iterations: maxIterations,
    converged: false,
  };
}

function solveODEEuler(dydx, x0, y0, stepSize, steps) {
  assertFunction(dydx, 'dydx');
  assertFinite(x0, 'x0');
  assertFinite(y0, 'y0');
  assertFinite(stepSize, 'stepSize');

  if (!Number.isInteger(steps) || steps < 1) {
    throw new Error('steps must be an integer greater than zero.');
  }

  const points = [{ x: x0, y: y0 }];
  let x = x0;
  let y = y0;

  for (let i = 0; i < steps; i += 1) {
    y += stepSize * dydx(x, y);
    x += stepSize;
    points.push({ x, y });
  }

  return points;
}

function solveODERungeKutta4(dydx, x0, y0, stepSize, steps) {
  assertFunction(dydx, 'dydx');
  assertFinite(x0, 'x0');
  assertFinite(y0, 'y0');
  assertFinite(stepSize, 'stepSize');

  if (!Number.isInteger(steps) || steps < 1) {
    throw new Error('steps must be an integer greater than zero.');
  }

  const points = [{ x: x0, y: y0 }];
  let x = x0;
  let y = y0;

  for (let i = 0; i < steps; i += 1) {
    const k1 = dydx(x, y);
    const k2 = dydx(x + stepSize / 2, y + (stepSize * k1) / 2);
    const k3 = dydx(x + stepSize / 2, y + (stepSize * k2) / 2);
    const k4 = dydx(x + stepSize, y + stepSize * k3);

    y += (stepSize / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    x += stepSize;
    points.push({ x, y });
  }

  return points;
}

module.exports = {
  newtonRaphson,
  numericalDerivative,
  numericalIntegration,
  solveODEEuler,
  solveODERungeKutta4,
};
