class Complex {
  constructor(real = 0, imag = 0) {
    this.real = Number(real);
    this.imag = Number(imag);

    if (!Number.isFinite(this.real) || !Number.isFinite(this.imag)) {
      throw new Error('Complex parts must be finite numbers.');
    }
  }

  add(other) {
    const c = Complex.from(other);
    return new Complex(this.real + c.real, this.imag + c.imag);
  }

  sub(other) {
    const c = Complex.from(other);
    return new Complex(this.real - c.real, this.imag - c.imag);
  }

  mul(other) {
    const c = Complex.from(other);
    return new Complex(
      this.real * c.real - this.imag * c.imag,
      this.real * c.imag + this.imag * c.real
    );
  }

  div(other) {
    const c = Complex.from(other);
    const denominator = c.real * c.real + c.imag * c.imag;

    if (denominator === 0) {
      throw new Error('Division by zero complex number.');
    }

    return new Complex(
      (this.real * c.real + this.imag * c.imag) / denominator,
      (this.imag * c.real - this.real * c.imag) / denominator
    );
  }

  abs() {
    return Math.hypot(this.real, this.imag);
  }

  conjugate() {
    return new Complex(this.real, -this.imag);
  }

  toString(precision = 6) {
    const realPart = this.real.toFixed(precision);
    const imagAbs = Math.abs(this.imag).toFixed(precision);
    const sign = this.imag >= 0 ? '+' : '-';
    return `${realPart}${sign}${imagAbs}i`;
  }

  static from(value) {
    if (value instanceof Complex) {
      return value;
    }

    if (typeof value === 'number') {
      return new Complex(value, 0);
    }

    if (value && typeof value.real === 'number' && typeof value.imag === 'number') {
      return new Complex(value.real, value.imag);
    }

    throw new Error('Cannot convert value to Complex.');
  }
}

module.exports = { Complex };
