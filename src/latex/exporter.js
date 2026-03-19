/**
 * LaTeX Export Module for scientific-toolkit
 * Converts mathematical expressions and results to LaTeX format
 */

class LaTeXExporter {
  /**
   * Convert a mathematical expression to LaTeX
   * @param {string} expression - The expression (e.g., "1/2", "2*x", "sqrt(2)")
   * @param {Object} options - Export options
   * @returns {string} LaTeX formatted expression
   */
  static expressionToLatex(expression, options = {}) {
    if (typeof expression !== 'string') {
      throw new Error('Expression must be a string');
    }

    let latex = expression;

    // Replace common mathematical notation
    latex = latex.replace(/\*/g, ' \\cdot ');
    latex = latex.replace(/\//g, ' / ');
    latex = latex.replace(/\^/g, '^');

    // Replace common functions
    latex = latex.replace(/sqrt\(/g, '\\sqrt{');
    latex = latex.replace(/\)([^)]*)?$/g, '}');
    latex = latex.replace(/sin\(/g, '\\sin(');
    latex = latex.replace(/cos\(/g, '\\cos(');
    latex = latex.replace(/tan\(/g, '\\tan(');
    latex = latex.replace(/exp\(/g, 'e^{');
    latex = latex.replace(/log\(/g, '\\log(');
    latex = latex.replace(/ln\(/g, '\\ln(');

    // Replace Greek letters
    latex = latex.replace(/pi/g, '\\pi');
    latex = latex.replace(/alpha/g, '\\alpha');
    latex = latex.replace(/beta/g, '\\beta');
    latex = latex.replace(/gamma/g, '\\gamma');
    latex = latex.replace(/theta/g, '\\theta');

    // Wrap in inline math mode if not already wrapped
    if (options.displayMode) {
      latex = `$$${latex}$$`;
    } else if (!latex.startsWith('$')) {
      latex = `$${latex}$`;
    }

    return latex;
  }

  /**
   * Create a LaTeX equation environment (e.g., equation, align)
   * @param {string} latex - The LaTeX content
   * @param {string} environment - The environment name (default: 'equation')
   * @param {string} label - Optional equation label for referencing
   * @returns {string} Full LaTeX equation environment
   */
  static createEquation(latex, environment = 'equation', label = null) {
    const cleanLatex = latex.replace(/^\$+/, '').replace(/\$+$/, '');

    let result = `\\begin{${environment}}\n`;
    if (label) {
      result += `  \\label{eq:${label}}\n`;
    }
    result += `  ${cleanLatex}\n`;
    result += `\\end{${environment}}`;

    return result;
  }

  /**
   * Format a numerical result as LaTeX
   * @param {string} label - Label for the result
   * @param {number} value - Numerical value
   * @param {string} unit - Optional unit
   * @param {number} precision - Number of decimal places
   * @returns {string} Formatted LaTeX result
   */
  static formatResult(label, value, unit = '', precision = 4) {
    if (typeof value !== 'number') {
      throw new Error('Value must be a number');
    }

    const formattedValue = value.toFixed(precision);
    let result = `${label} = ${formattedValue}`;

    if (unit) {
      result += ` \\, \\text{${unit}}`;
    }

    return `$${result}$`;
  }

  /**
   * Format results as multiple-line LaTeX aligned equations
   * @param {Object} results - Object with {label: value} pairs
   * @param {string} unit - Optional unit for all values
   * @param {number} precision - Number of decimal places
   * @returns {string} LaTeX align environment
   */
  static formatResults(results, unit = '', precision = 4) {
    if (typeof results !== 'object' || results === null) {
      throw new Error('Results must be an object');
    }

    let latex = '\\begin{align*}\n';

    Object.entries(results).forEach(([label, value], index) => {
      if (typeof value !== 'number') {
        throw new Error(`Value for "${label}" must be a number`);
      }

      const formattedValue = value.toFixed(precision);
      let line = `  ${label} &= ${formattedValue}`;

      if (unit) {
        line += ` \\, \\text{${unit}}`;
      }

      if (index < Object.entries(results).length - 1) {
        line += ' \\\\';
      }

      latex += `${line}\n`;
    });

    latex += '\\end{align*}';

    return latex;
  }

  /**
   * Create a LaTeX matrix
   * @param {Array<Array<number>>} matrix - 2D array representing matrix
   * @param {string} style - Matrix style ('pmatrix', 'bmatrix', 'vmatrix', etc.)
   * @returns {string} LaTeX matrix
   */
  static matrixToLatex(matrix, style = 'pmatrix') {
    if (!Array.isArray(matrix) || matrix.length === 0) {
      throw new Error('Matrix must be a non-empty 2D array');
    }

    if (!Array.isArray(matrix[0])) {
      throw new Error('Matrix must be a 2D array');
    }

    let latex = `\\begin{${style}}\n`;

    matrix.forEach((row, rowIndex) => {
      const formattedRow = row
        .map((val) => {
          if (typeof val === 'number') {
            // Only format to 2 decimals if it's not an integer
            if (Number.isInteger(val)) {
              return String(val);
            }
            return val.toFixed(2);
          }
          return String(val);
        })
        .join(' & ');

      latex += `  ${formattedRow}`;
      if (rowIndex < matrix.length - 1) {
        latex += ' \\\\';
      }
      latex += '\n';
    });

    latex += `\\end{${style}}`;

    return latex;
  }

  /**
   * Create a LaTeX fraction
   * @param {number|string} numerator - Numerator
   * @param {number|string} denominator - Denominator
   * @returns {string} LaTeX fraction
   */
  static fractionToLatex(numerator, denominator) {
    return `\\frac{${numerator}}{${denominator}}`;
  }

  /**
   * Create a LaTeX subscript
   * @param {string} base - Base variable
   * @param {string} subscript - Subscript
   * @returns {string} LaTeX subscript
   */
  static subscript(base, subscript) {
    return `${base}_{${subscript}}`;
  }

  /**
   * Create a LaTeX superscript
   * @param {string} base - Base variable
   * @param {string} superscript - Superscript
   * @returns {string} LaTeX superscript
   */
  static superscript(base, superscript) {
    return `${base}^{${superscript}}`;
  }

  /**
   * Create a LaTeX document with preamble
   * @param {string} content - LaTeX content
   * @param {Object} options - Options {title, author, packages, documentClass}
   * @returns {string} Complete LaTeX document
   */
  static createDocument(content, options = {}) {
    const {
      documentClass = 'article',
      packages = ['amsmath', 'amssymb', 'graphicx'],
      title = 'Scientific Calculation',
      author = 'scientific-toolkit',
    } = options;

    let doc = `\\documentclass{${documentClass}}\n\n`;

    // Add packages
    packages.forEach((pkg) => {
      doc += `\\usepackage{${pkg}}\n`;
    });

    doc += '\n';
    doc += `\\title{${title}}\n`;
    doc += `\\author{${author}}\n`;
    doc += '\\date{}\n\n';
    doc += '\\begin{document}\n';
    doc += '\\maketitle\n\n';
    doc += content;
    doc += '\n\n\\end{document}';

    return doc;
  }

  /**
   * Export complex number to LaTeX
   * @param {number} real - Real part
   * @param {number} imag - Imaginary part
   * @param {boolean} compact - Use compact form (default: false)
   * @returns {string} LaTeX complex number
   */
  static complexToLatex(real, imag, compact = false) {
    if (imag === 0) {
      return String(real);
    }
    if (real === 0) {
      return compact ? `${imag}i` : `${imag}\\,i`;
    }

    const imagValue = Math.abs(imag);
    const imagSign = imag >= 0 ? ' + ' : ' - ';

    if (compact) {
      return `${real}${imagSign.replace(/ /g, '')}${imagValue}i`;
    }
    return `${real}${imagSign}${imagValue}\\,i`;
  }

  /**
   * Export polynomial to LaTeX
   * @param {Array<number>} coefficients - Coefficients in descending order [a, b, c] for ax^2 + bx + c
   * @param {string} variable - Variable (default: 'x')
   * @returns {string} LaTeX polynomial
   */
  static polynomialToLatex(coefficients, variable = 'x') {
    if (!Array.isArray(coefficients) || coefficients.length === 0) {
      throw new Error('Coefficients must be a non-empty array');
    }

    const terms = [];
    const degree = coefficients.length - 1;

    coefficients.forEach((coef, index) => {
      if (coef === 0) return;

      const exp = degree - index;
      let term = '';

      // Handle sign
      if (terms.length > 0 && coef > 0) {
        term += ' + ';
      } else if (coef < 0) {
        term += ' - ';
      }

      const absCoef = Math.abs(coef);

      if (exp === 0) {
        term += String(absCoef);
      } else if (exp === 1) {
        if (absCoef === 1) {
          term += variable;
        } else {
          term += `${absCoef}${variable}`;
        }
      } else if (absCoef === 1) {
        term += `${variable}^{${exp}}`;
      } else {
        term += `${absCoef}${variable}^{${exp}}`;
      }

      terms.push(term);
    });

    return terms.length === 0 ? '0' : terms.join('');
  }
}

module.exports = LaTeXExporter;
