const { Complex } = require('./core/complex');
const { matrixMultiply, determinant } = require('./core/linearAlgebra');
const { derivative, integral } = require('./core/calculus');
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
