function validateDataset(x, y) {
  if (!Array.isArray(x) || !Array.isArray(y) || x.length !== y.length || x.length < 2) {
    throw new Error('x and y must be arrays of equal length with at least two points.');
  }

  if (x.some((v) => !Number.isFinite(v)) || y.some((v) => !Number.isFinite(v))) {
    throw new Error('x and y must only contain finite numbers.');
  }
}

function rSquared(y, yHat) {
  const yMean = y.reduce((acc, value) => acc + value, 0) / y.length;
  const ssTot = y.reduce((acc, value) => acc + (value - yMean) ** 2, 0);
  const ssRes = y.reduce((acc, value, i) => acc + (value - yHat[i]) ** 2, 0);

  if (ssTot === 0) {
    return 1;
  }

  return 1 - ssRes / ssTot;
}

function linearLeastSquares(x, y) {
  validateDataset(x, y);

  const n = x.length;
  const sumX = x.reduce((acc, value) => acc + value, 0);
  const sumY = y.reduce((acc, value) => acc + value, 0);
  const sumXY = x.reduce((acc, value, i) => acc + value * y[i], 0);
  const sumXX = x.reduce((acc, value) => acc + value * value, 0);

  const denominator = n * sumXX - sumX * sumX;
  if (Math.abs(denominator) < Number.EPSILON) {
    throw new Error('Cannot fit a line when all x values are identical.');
  }

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  const predict = (xValue) => slope * xValue + intercept;
  const yHat = x.map(predict);

  return {
    slope,
    intercept,
    rSquared: rSquared(y, yHat),
    predict,
  };
}

function solveLinearSystem(matrix, vector) {
  const n = matrix.length;
  const a = matrix.map((row) => row.slice());
  const b = vector.slice();

  for (let col = 0; col < n; col += 1) {
    let pivot = col;
    for (let row = col + 1; row < n; row += 1) {
      if (Math.abs(a[row][col]) > Math.abs(a[pivot][col])) {
        pivot = row;
      }
    }

    if (Math.abs(a[pivot][col]) < Number.EPSILON) {
      throw new Error('Polynomial fit failed because the normal matrix is singular.');
    }

    if (pivot !== col) {
      [a[col], a[pivot]] = [a[pivot], a[col]];
      [b[col], b[pivot]] = [b[pivot], b[col]];
    }

    for (let row = col + 1; row < n; row += 1) {
      const factor = a[row][col] / a[col][col];
      for (let k = col; k < n; k += 1) {
        a[row][k] -= factor * a[col][k];
      }
      b[row] -= factor * b[col];
    }
  }

  const solution = Array(n).fill(0);
  for (let row = n - 1; row >= 0; row -= 1) {
    let sum = b[row];
    for (let col = row + 1; col < n; col += 1) {
      sum -= a[row][col] * solution[col];
    }
    solution[row] = sum / a[row][row];
  }

  return solution;
}

function polynomialFit(x, y, degree) {
  validateDataset(x, y);

  if (!Number.isInteger(degree) || degree < 1) {
    throw new Error('degree must be an integer greater than or equal to 1.');
  }

  if (degree >= x.length) {
    throw new Error('degree must be smaller than the number of data points.');
  }

  const size = degree + 1;
  const normalMatrix = Array.from({ length: size }, () => Array(size).fill(0));
  const rhs = Array(size).fill(0);

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      normalMatrix[row][col] = x.reduce((acc, value) => acc + value ** (row + col), 0);
    }

    rhs[row] = x.reduce((acc, value, i) => acc + y[i] * value ** row, 0);
  }

  const coefficients = solveLinearSystem(normalMatrix, rhs);
  const predict = (xValue) => coefficients.reduce((acc, c, i) => acc + c * xValue ** i, 0);
  const yHat = x.map(predict);

  return {
    coefficients,
    rSquared: rSquared(y, yHat),
    predict,
  };
}

module.exports = {
  linearLeastSquares,
  polynomialFit,
};
