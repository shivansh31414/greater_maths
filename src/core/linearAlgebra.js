function validateMatrix(matrix, name) {
  if (!Array.isArray(matrix) || matrix.length === 0 || !Array.isArray(matrix[0])) {
    throw new Error(`${name} must be a non-empty 2D array.`);
  }

  const cols = matrix[0].length;
  if (cols === 0) {
    throw new Error(`${name} must have at least one column.`);
  }

  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== cols) {
      throw new Error(`${name} must be rectangular.`);
    }

    for (const value of row) {
      if (!Number.isFinite(value)) {
        throw new Error(`${name} must contain only finite numbers.`);
      }
    }
  }
}

function matrixMultiply(a, b) {
  validateMatrix(a, 'Matrix A');
  validateMatrix(b, 'Matrix B');

  const aRows = a.length;
  const aCols = a[0].length;
  const bRows = b.length;
  const bCols = b[0].length;

  if (aCols !== bRows) {
    throw new Error('Matrix dimensions do not align for multiplication.');
  }

  const result = Array.from({ length: aRows }, () => Array(bCols).fill(0));

  for (let i = 0; i < aRows; i += 1) {
    for (let k = 0; k < aCols; k += 1) {
      const aik = a[i][k];
      for (let j = 0; j < bCols; j += 1) {
        result[i][j] += aik * b[k][j];
      }
    }
  }

  return result;
}

function determinant(matrix) {
  validateMatrix(matrix, 'Matrix');

  const n = matrix.length;
  if (matrix[0].length !== n) {
    throw new Error('Determinant is only defined for square matrices.');
  }

  const copy = matrix.map((row) => row.slice());
  let sign = 1;

  for (let col = 0; col < n; col += 1) {
    let pivotRow = col;
    let maxAbs = Math.abs(copy[col][col]);

    for (let row = col + 1; row < n; row += 1) {
      const absValue = Math.abs(copy[row][col]);
      if (absValue > maxAbs) {
        maxAbs = absValue;
        pivotRow = row;
      }
    }

    if (Math.abs(copy[pivotRow][col]) < Number.EPSILON) {
      return 0;
    }

    if (pivotRow !== col) {
      [copy[col], copy[pivotRow]] = [copy[pivotRow], copy[col]];
      sign *= -1;
    }

    for (let row = col + 1; row < n; row += 1) {
      const factor = copy[row][col] / copy[col][col];
      for (let k = col; k < n; k += 1) {
        copy[row][k] -= factor * copy[col][k];
      }
    }
  }

  let det = sign;
  for (let i = 0; i < n; i += 1) {
    det *= copy[i][i];
  }

  if (Math.abs(det) < Number.EPSILON) {
    return 0;
  }

  return det;
}

module.exports = { matrixMultiply, determinant };
