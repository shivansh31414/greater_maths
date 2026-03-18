const { gradient, divergence, curl } = require('../src/vector/calculus');

describe('Vector calculus', () => {
  test('gradient of x^2 + y^2 + z^2 at [1,2,3] is [2,4,6]', () => {
    const g = gradient(([x, y, z]) => x * x + y * y + z * z, [1, 2, 3]);
    expect(g[0]).toBeCloseTo(2, 5);
    expect(g[1]).toBeCloseTo(4, 5);
    expect(g[2]).toBeCloseTo(6, 5);
  });

  test('divergence of F=[x,y,z] equals 3', () => {
    const div = divergence(([x, y, z]) => [x, y, z], [2, -1, 5]);
    expect(div).toBeCloseTo(3, 6);
  });

  test('curl of rotational field F=[-y,x,0] equals [0,0,2]', () => {
    const c = curl(([x, y, z]) => [-y, x, 0 + z * 0], [1, 2, 3]);
    expect(c[0]).toBeCloseTo(0, 6);
    expect(c[1]).toBeCloseTo(0, 6);
    expect(c[2]).toBeCloseTo(2, 6);
  });
});
