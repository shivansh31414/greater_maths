function assertVector(point, name = 'point') {
  if (!Array.isArray(point) || point.length === 0 || point.some((v) => !Number.isFinite(v))) {
    throw new Error(`${name} must be a non-empty array of finite numbers.`);
  }
}

function assertFunction(fn, name = 'fn') {
  if (typeof fn !== 'function') {
    throw new Error(`${name} must be a function.`);
  }
}

function shiftPoint(point, axis, delta) {
  const next = point.slice();
  next[axis] += delta;
  return next;
}

function gradient(scalarField, point, h = 1e-5) {
  assertFunction(scalarField, 'scalarField');
  assertVector(point);

  if (!Number.isFinite(h) || h <= 0) {
    throw new Error('h must be a positive finite number.');
  }

  return point.map((_, axis) => {
    const plus = scalarField(shiftPoint(point, axis, h));
    const minus = scalarField(shiftPoint(point, axis, -h));
    return (plus - minus) / (2 * h);
  });
}

function divergence(vectorField, point, h = 1e-5) {
  assertFunction(vectorField, 'vectorField');
  assertVector(point);

  if (!Number.isFinite(h) || h <= 0) {
    throw new Error('h must be a positive finite number.');
  }

  let sum = 0;
  for (let axis = 0; axis < point.length; axis += 1) {
    const plus = vectorField(shiftPoint(point, axis, h));
    const minus = vectorField(shiftPoint(point, axis, -h));

    if (
      !Array.isArray(plus) ||
      !Array.isArray(minus) ||
      plus.length <= axis ||
      minus.length <= axis
    ) {
      throw new Error('vectorField must return vectors with enough components for each axis.');
    }

    sum += (plus[axis] - minus[axis]) / (2 * h);
  }

  return sum;
}

function curl(vectorField, point, h = 1e-5) {
  assertFunction(vectorField, 'vectorField');
  assertVector(point);

  if (point.length !== 3) {
    throw new Error('curl is defined here for 3D vectors only.');
  }

  if (!Number.isFinite(h) || h <= 0) {
    throw new Error('h must be a positive finite number.');
  }

  const field = (p) => {
    const value = vectorField(p);
    if (!Array.isArray(value) || value.length !== 3 || value.some((v) => !Number.isFinite(v))) {
      throw new Error('vectorField must return a 3D vector of finite numbers.');
    }
    return value;
  };

  const dFzDy = (field(shiftPoint(point, 1, h))[2] - field(shiftPoint(point, 1, -h))[2]) / (2 * h);
  const dFyDz = (field(shiftPoint(point, 2, h))[1] - field(shiftPoint(point, 2, -h))[1]) / (2 * h);

  const dFxDz = (field(shiftPoint(point, 2, h))[0] - field(shiftPoint(point, 2, -h))[0]) / (2 * h);
  const dFzDx = (field(shiftPoint(point, 0, h))[2] - field(shiftPoint(point, 0, -h))[2]) / (2 * h);

  const dFyDx = (field(shiftPoint(point, 0, h))[1] - field(shiftPoint(point, 0, -h))[1]) / (2 * h);
  const dFxDy = (field(shiftPoint(point, 1, h))[0] - field(shiftPoint(point, 1, -h))[0]) / (2 * h);

  return [dFzDy - dFyDz, dFxDz - dFzDx, dFyDx - dFxDy];
}

module.exports = {
  gradient,
  divergence,
  curl,
};
