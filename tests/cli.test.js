const { execFileSync } = require('node:child_process');
const path = require('node:path');

const cliPath = path.resolve(__dirname, '../bin/cli.js');

function runCli(args) {
  const output = execFileSync(process.execPath, [cliPath, ...args], {
    encoding: 'utf8',
    env: {
      ...process.env,
      NODE_OPTIONS: '',
    },
  }).trim();

  const matches = output.match(/[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g);
  if (!matches || matches.length === 0) {
    throw new Error(`No numeric output found: ${output}`);
  }
  return matches[matches.length - 1];
}

describe('CLI', () => {
  test('computes determinant command', () => {
    const output = runCli(['matrix', 'det', '[[1,2],[3,4]]']);
    expect(Number(output)).toBeCloseTo(-2, 10);
  });

  test('converts units command', () => {
    const output = runCli(['convert', '100', 'cm', 'm']);
    expect(Number(output)).toBeCloseTo(1, 10);
  });

  test('probability command works', () => {
    const output = runCli(['probability', 'normal-cdf', '0', '0', '1']);
    expect(Number(output)).toBeCloseTo(0.5, 6);
  });
});
