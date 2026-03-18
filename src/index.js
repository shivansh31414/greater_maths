const { Complex } = require('./core/complex');
const { matrixMultiply, determinant } = require('./core/linearAlgebra');
const { derivative, integral } = require('./core/calculus');
const {
  newtonRaphson,
  numericalDerivative,
  numericalIntegration,
  solveODEEuler,
  solveODERungeKutta4,
} = require('./numerical/methods');
const { gradient, divergence, curl } = require('./vector/calculus');
const { linearLeastSquares, polynomialFit } = require('./regression/fitting');
const { ohmsLaw, impedanceSeriesRLC } = require('./engineering/circuit');
const {
  molarMass,
  gramsToMoles,
  molesToGrams,
  theoreticalYield,
} = require('./engineering/stoichiometry');
const { normalPdf, normalCdf, poissonPmf, binomialPmf } = require('./probability/distributions');
const { convert, analyzeDimensions } = require('./units/conversion');

module.exports = {
  core: {
    Complex,
    matrixMultiply,
    determinant,
    derivative,
    integral,
  },
  numerical: {
    newtonRaphson,
    numericalDerivative,
    numericalIntegration,
    solveODEEuler,
    solveODERungeKutta4,
  },
  vector: {
    gradient,
    divergence,
    curl,
  },
  regression: {
    linearLeastSquares,
    polynomialFit,
  },
  engineering: {
    circuit: {
      ohmsLaw,
      impedanceSeriesRLC,
    },
    chemistry: {
      molarMass,
      gramsToMoles,
      molesToGrams,
      theoreticalYield,
    },
  },
  probability: {
    normalPdf,
    normalCdf,
    poissonPmf,
    binomialPmf,
  },
  units: {
    convert,
    analyzeDimensions,
  },
};
