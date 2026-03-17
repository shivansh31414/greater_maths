const { matrixMultiply, determinant } = require('../src/core/linearAlgebra');

describe('Linear algebra', () => {
  test('matrix multiplication returns expected result', () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [
      [5, 6],
      [7, 8],
    ];

    expect(matrixMultiply(a, b)).toEqual([
      [19, 22],
      [43, 50],
    ]);
  });

  test('handles large matrix multiplication', () => {
    const size = 20;
    const identity = Array.from({ length: size }, (_, r) =>
      Array.from({ length: size }, (_, c) => (r === c ? 1 : 0))
    );
    const random = Array.from({ length: size }, (_, r) =>
      Array.from({ length: size }, (_, c) => r * size + c + 1)
    );

    expect(matrixMultiply(random, identity)).toEqual(random);
  });

  test('determinant computes using elimination', () => {
    const matrix = [
      [4, 3],
      [6, 3],
    ];

    expect(determinant(matrix)).toBeCloseTo(-6, 10);
  });

  test('determinant of upper triangular matrix equals diagonal product', () => {
    const matrix = [
      [2, 1, 0, 0],
      [0, -3, 4, 0],
      [0, 0, 5, 7],
      [0, 0, 0, -2],
    ];

    expect(determinant(matrix)).toBeCloseTo(60, 10);
  });
});
