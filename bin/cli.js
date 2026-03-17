#!/usr/bin/env node

const toolkit = require('../src');

function parseNumber(value, name) {
  const n = Number(value);
  if (!Number.isFinite(n)) {
    throw new Error(`${name} must be a finite number.`);
  }
  return n;
}

function parseIntStrict(value, name) {
  const n = Number.parseInt(value, 10);
  if (!Number.isInteger(n)) {
    throw new Error(`${name} must be an integer.`);
  }
  return n;
}

function parseMatrix(input) {
  let matrix;
  try {
    matrix = JSON.parse(input);
  } catch {
    throw new Error('Matrix must be valid JSON, e.g. [[1,2],[3,4]].');
  }

  return matrix;
}

function expressionToFunction(expression) {
  try {
    // Expression uses x and can call Math methods, e.g. Math.sin(x)
    return new Function('x', `'use strict'; return (${expression});`);
  } catch {
    throw new Error('Invalid expression. Example: "Math.sin(x) * x"');
  }
}

function showUsage() {
  console.log(`scientific-toolkit CLI

Usage:
  scientific-toolkit complex <add|sub|mul|div> <aReal> <aImag> <bReal> <bImag>
  scientific-toolkit matrix <multiply|det> <matrixA> [matrixB]
  scientific-toolkit calculus <derivative|integral> <expression> <args...>
  scientific-toolkit probability <normal-pdf|normal-cdf|poisson|binomial> <args...>
  scientific-toolkit convert <value> <fromUnit> <toUnit>
  scientific-toolkit analyze-unit <unitExpression>

Examples:
  scientific-toolkit complex mul 2 3 4 -1
  scientific-toolkit matrix det "[[1,2],[3,4]]"
  scientific-toolkit calculus derivative "Math.sin(x)" 0
  scientific-toolkit calculus integral "x*x" 0 2 1000
  scientific-toolkit probability normal-cdf 1.96 0 1
  scientific-toolkit convert 100 cm m
  scientific-toolkit analyze-unit "N/m^2"`);
}

function main() {
  const [, , command, subcommand, ...args] = process.argv;

  if (!command || command === '--help' || command === '-h') {
    showUsage();
    return;
  }

  if (command === 'complex') {
    const [aReal, aImag, bReal, bImag] = args;
    const a = new toolkit.core.Complex(parseNumber(aReal, 'aReal'), parseNumber(aImag, 'aImag'));
    const b = new toolkit.core.Complex(parseNumber(bReal, 'bReal'), parseNumber(bImag, 'bImag'));

    let result;
    if (subcommand === 'add') result = a.add(b);
    else if (subcommand === 'sub') result = a.sub(b);
    else if (subcommand === 'mul') result = a.mul(b);
    else if (subcommand === 'div') result = a.div(b);
    else throw new Error('Unknown complex operation.');

    console.log(result.toString());
    return;
  }

  if (command === 'matrix') {
    if (subcommand === 'multiply') {
      const [aInput, bInput] = args;
      const result = toolkit.core.matrixMultiply(parseMatrix(aInput), parseMatrix(bInput));
      console.log(JSON.stringify(result));
      return;
    }

    if (subcommand === 'det') {
      const [matrixInput] = args;
      const result = toolkit.core.determinant(parseMatrix(matrixInput));
      console.log(result);
      return;
    }

    throw new Error('Unknown matrix operation.');
  }

  if (command === 'calculus') {
    if (subcommand === 'derivative') {
      const [expression, x, h] = args;
      const fn = expressionToFunction(expression);
      const result = toolkit.core.derivative(
        fn,
        parseNumber(x, 'x'),
        h ? parseNumber(h, 'h') : 1e-5
      );
      console.log(result);
      return;
    }

    if (subcommand === 'integral') {
      const [expression, a, b, segments] = args;
      const fn = expressionToFunction(expression);
      const result = toolkit.core.integral(
        fn,
        parseNumber(a, 'a'),
        parseNumber(b, 'b'),
        segments ? parseIntStrict(segments, 'segments') : 1000
      );
      console.log(result);
      return;
    }

    throw new Error('Unknown calculus operation.');
  }

  if (command === 'probability') {
    if (subcommand === 'normal-pdf') {
      const [x, mean = '0', stdDev = '1'] = args;
      console.log(
        toolkit.probability.normalPdf(
          parseNumber(x, 'x'),
          parseNumber(mean, 'mean'),
          parseNumber(stdDev, 'stdDev')
        )
      );
      return;
    }

    if (subcommand === 'normal-cdf') {
      const [x, mean = '0', stdDev = '1'] = args;
      console.log(
        toolkit.probability.normalCdf(
          parseNumber(x, 'x'),
          parseNumber(mean, 'mean'),
          parseNumber(stdDev, 'stdDev')
        )
      );
      return;
    }

    if (subcommand === 'poisson') {
      const [k, lambda] = args;
      console.log(
        toolkit.probability.poissonPmf(parseIntStrict(k, 'k'), parseNumber(lambda, 'lambda'))
      );
      return;
    }

    if (subcommand === 'binomial') {
      const [k, n, p] = args;
      console.log(
        toolkit.probability.binomialPmf(
          parseIntStrict(k, 'k'),
          parseIntStrict(n, 'n'),
          parseNumber(p, 'p')
        )
      );
      return;
    }

    throw new Error('Unknown probability operation.');
  }

  if (command === 'convert') {
    const [value, fromUnit, toUnit] = [subcommand, ...args];
    const result = toolkit.units.convert(parseNumber(value, 'value'), fromUnit, toUnit);
    console.log(result);
    return;
  }

  if (command === 'analyze-unit') {
    const [unitExpression] = [subcommand, ...args];
    console.log(JSON.stringify(toolkit.units.analyzeDimensions(unitExpression)));
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

try {
  main();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
