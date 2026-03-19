/**
 * Integration tests for LaTeX export
 */

const LaTeXExporter = require('../src/latex/exporter');

describe('LaTeX Export Integration Tests', () => {
  describe('Expression to LaTeX conversion', () => {
    it('should convert simple expressions to LaTeX', () => {
      const expr = '1/2';
      const latex = LaTeXExporter.expressionToLatex(expr);
      expect(latex).toContain('$');
      expect(latex).toContain('/');
    });

    it('should replace multiplication operator', () => {
      const expr = '2*x';
      const latex = LaTeXExporter.expressionToLatex(expr);
      expect(latex).toContain('\\cdot');
    });

    it('should replace mathematical functions', () => {
      const expr = 'sqrt(2)';
      const latex = LaTeXExporter.expressionToLatex(expr);
      expect(latex).toContain('\\sqrt');
    });

    it('should replace Greek letters', () => {
      const expr = 'pi * r^2';
      const latex = LaTeXExporter.expressionToLatex(expr);
      expect(latex).toContain('\\pi');
    });

    it('should support display mode', () => {
      const expr = 'sin(x) + cos(x)';
      const latex = LaTeXExporter.expressionToLatex(expr, { displayMode: true });
      expect(latex).toMatch(/^\$\$/);
      expect(latex).toMatch(/\$\$$/);
    });
  });

  describe('Equation creation', () => {
    it('should create equation environment', () => {
      const latex = LaTeXExporter.createEquation('E = mc^2');
      expect(latex).toContain('\\begin{equation}');
      expect(latex).toContain('\\end{equation}');
      expect(latex).toContain('E = mc^2');
    });

    it('should create equation with label', () => {
      const latex = LaTeXExporter.createEquation('E = mc^2', 'equation', 'einstein');
      expect(latex).toContain('\\label{eq:einstein}');
    });

    it('should create align environment', () => {
      const latex = LaTeXExporter.createEquation('a + b = c', 'align');
      expect(latex).toContain('\\begin{align}');
      expect(latex).toContain('\\end{align}');
    });
  });

  describe('Result formatting', () => {
    it('should format single result', () => {
      const result = LaTeXExporter.formatResult('x', 3.14159, 'm', 2);
      expect(result).toContain('x = 3.14');
      expect(result).toContain('\\text{m}');
    });

    it('should format multiple results aligned', () => {
      const results = { x: 1.5, y: 2.7, z: 3.14 };
      const latex = LaTeXExporter.formatResults(results, 'unit', 1);
      expect(latex).toContain('\\begin{align*}');
      expect(latex).toContain('\\end{align*}');
      expect(latex).toContain('x &= 1.5');
      expect(latex).toContain('y &= 2.7');
      expect(latex).toContain('z &= 3.1');
    });

    it('should throw error for non-numeric values', () => {
      const results = { x: 'not a number' };
      expect(() => {
        LaTeXExporter.formatResults(results);
      }).toThrow('Value for "x" must be a number');
    });
  });

  describe('Matrix formatting', () => {
    it('should create pmatrix', () => {
      const matrix = [
        [1, 2],
        [3, 4],
      ];
      const latex = LaTeXExporter.matrixToLatex(matrix, 'pmatrix');
      expect(latex).toContain('\\begin{pmatrix}');
      expect(latex).toContain('\\end{pmatrix}');
      expect(latex).toContain('1 & 2');
      expect(latex).toContain('3 & 4');
    });

    it('should create bmatrix', () => {
      const matrix = [[1]];
      const latex = LaTeXExporter.matrixToLatex(matrix, 'bmatrix');
      expect(latex).toContain('\\begin{bmatrix}');
      expect(latex).toContain('\\end{bmatrix}');
    });

    it('should handle 3x3 matrix', () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const latex = LaTeXExporter.matrixToLatex(matrix);
      expect(latex).toContain('1 & 2 & 3');
      expect(latex).toContain('4 & 5 & 6');
      expect(latex).toContain('7 & 8 & 9');
    });

    it('should throw error for empty matrix', () => {
      expect(() => {
        LaTeXExporter.matrixToLatex([]);
      }).toThrow('Matrix must be a non-empty 2D array');
    });

    it('should throw error for non-2D array', () => {
      expect(() => {
        LaTeXExporter.matrixToLatex([1, 2, 3]);
      }).toThrow('Matrix must be a 2D array');
    });
  });

  describe('Fraction and subscript/superscript', () => {
    it('should create fractions', () => {
      const frac = LaTeXExporter.fractionToLatex('a', 'b');
      expect(frac).toBe('\\frac{a}{b}');
    });

    it('should create subscripts', () => {
      const sub = LaTeXExporter.subscript('x', 'i');
      expect(sub).toBe('x_{i}');
    });

    it('should create superscripts', () => {
      const sup = LaTeXExporter.superscript('x', 'n');
      expect(sup).toBe('x^{n}');
    });

    it('should create complex number subscript', () => {
      const sub = LaTeXExporter.subscript('V', 'out');
      expect(sub).toContain('V_{out}');
    });
  });

  describe('Complex number formatting', () => {
    it('should format pure real numbers', () => {
      const latex = LaTeXExporter.complexToLatex(5, 0);
      expect(latex).toBe('5');
    });

    it('should format pure imaginary numbers', () => {
      const latex = LaTeXExporter.complexToLatex(0, 3);
      expect(latex).toContain('3');
      expect(latex).toContain('i');
    });

    it('should format complex numbers with both parts', () => {
      const latex = LaTeXExporter.complexToLatex(3, 4);
      expect(latex).toContain('3');
      expect(latex).toContain('4');
      expect(latex).toContain('i');
    });

    it('should format negative imaginary part', () => {
      const latex = LaTeXExporter.complexToLatex(2, -3);
      expect(latex).toContain('-');
      expect(latex).toContain('3');
    });
  });

  describe('Polynomial formatting', () => {
    it('should format quadratic polynomial', () => {
      const poly = LaTeXExporter.polynomialToLatex([1, -2, 1]);
      expect(poly).toContain('x^');
      expect(poly).toContain('-');
    });

    it('should format linear polynomial', () => {
      const poly = LaTeXExporter.polynomialToLatex([2, -3]);
      expect(poly).toContain('2x');
      expect(poly).toContain('3');
    });

    it('should format constant polynomial', () => {
      const poly = LaTeXExporter.polynomialToLatex([5]);
      expect(poly).toBe('5');
    });

    it('should skip zero coefficients', () => {
      const poly = LaTeXExporter.polynomialToLatex([1, 0, -1]);
      expect(poly).not.toContain('0x');
    });

    it('should handle different variables', () => {
      const poly = LaTeXExporter.polynomialToLatex([1, 2], 't');
      expect(poly).toContain('t');
    });
  });

  describe('Document creation', () => {
    it('should create basic LaTeX document', () => {
      const doc = LaTeXExporter.createDocument('Hello World');
      expect(doc).toContain('\\documentclass{article}');
      expect(doc).toContain('\\usepackage{amsmath}');
      expect(doc).toContain('\\begin{document}');
      expect(doc).toContain('\\end{document}');
      expect(doc).toContain('Hello World');
    });

    it('should create document with custom options', () => {
      const doc = LaTeXExporter.createDocument('Content', {
        documentClass: 'report',
        title: 'My Report',
        author: 'John Doe',
        packages: ['graphicx'],
      });
      expect(doc).toContain('\\documentclass{report}');
      expect(doc).toContain('\\usepackage{graphicx}');
      expect(doc).toContain('\\title{My Report}');
      expect(doc).toContain('\\author{John Doe}');
    });

    it('should include multiple packages', () => {
      const doc = LaTeXExporter.createDocument('', {
        packages: ['tikz', 'pgfplots', 'array'],
      });
      expect(doc).toContain('\\usepackage{tikz}');
      expect(doc).toContain('\\usepackage{pgfplots}');
      expect(doc).toContain('\\usepackage{array}');
    });
  });

  describe('Integration: Complex calculations to LaTeX', () => {
    it('should export a complete calculation result', () => {
      // Simulate exporting results from orbital velocity calculation
      const results = {
        'M_{sun}': 1.989e30,
        'r_{earth}': 1.496e11,
        'v_{orbital}': 29814,
      };

      const latex = LaTeXExporter.formatResults(results, 'm/s', 0);
      expect(latex).toContain('M_{sun}');
      expect(latex).toContain('r_{earth}');
      expect(latex).toContain('v_{orbital}');
    });

    it('should create equation with polynomial', () => {
      const coeffs = [1, 0, -4]; // x^2 - 4
      const poly = LaTeXExporter.polynomialToLatex(coeffs);
      const equation = LaTeXExporter.createEquation(poly, 'equation', 'quadratic');
      expect(equation).toContain('\\label{eq:quadratic}');
      expect(equation).toContain(poly);
    });

    it('should export complex impedance', () => {
      const real = 100;
      const imag = 50;
      const impedance = LaTeXExporter.complexToLatex(real, imag);
      const result = `Z = ${impedance} \\, \\Omega`;
      expect(result).toContain('100');
      expect(result).toContain('50');
      expect(result).toContain('i');
    });
  });
});
