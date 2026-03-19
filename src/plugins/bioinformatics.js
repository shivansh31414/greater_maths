/**
 * Bioinformatics Plugin for scientific-toolkit
 * Domain-specific calculations for bioinformatics and biochemistry
 */

const { Plugin } = require('./loader');

/**
 * Calculate protein molecular weight from sequence
 * Approximate: Avg amino acid weight ≈ 110 Da
 * @param {number} sequenceLength - Number of amino acids
 * @returns {number} Molecular weight (Da)
 */
function proteinMolecularWeight(sequenceLength) {
  if (sequenceLength < 0 || !Number.isInteger(sequenceLength)) {
    throw new Error('Sequence length must be a non-negative integer');
  }
  // Average amino acid MW - H2O (lost in peptide bond formation)
  const avgAminoAcidWeight = 110;
  return sequenceLength * avgAminoAcidWeight - (sequenceLength - 1) * 18;
}

/**
 * Calculate DNA GC content
 * @param {string} sequence - DNA sequence
 * @returns {number} GC content percentage (0-100)
 */
function gcContent(sequence) {
  if (typeof sequence !== 'string') {
    throw new Error('Sequence must be a string');
  }
  const upperSeq = sequence.toUpperCase();
  if (!upperSeq.match(/^[ATGC]*$/i)) {
    throw new Error('Invalid DNA sequence (only A, T, G, C allowed)');
  }
  if (upperSeq.length === 0) {
    return 0;
  }
  const gcCount = (upperSeq.match(/[GC]/g) || []).length;
  return (gcCount / upperSeq.length) * 100;
}

/**
 * Transcribe DNA to RNA (T -> U)
 * @param {string} dnaSequence - DNA sequence
 * @returns {string} RNA sequence
 */
function transcribeDNA(dnaSequence) {
  if (typeof dnaSequence !== 'string') {
    throw new Error('Sequence must be a string');
  }
  const upperSeq = dnaSequence.toUpperCase();
  if (!upperSeq.match(/^[ATGC]*$/i)) {
    throw new Error('Invalid DNA sequence');
  }
  return upperSeq.replace(/T/g, 'U');
}

/**
 * Reverse complement of DNA sequence
 * @param {string} sequence - DNA sequence
 * @returns {string} Reverse complement
 */
function reverseComplement(sequence) {
  if (typeof sequence !== 'string') {
    throw new Error('Sequence must be a string');
  }
  const complement = { A: 'T', T: 'A', G: 'C', C: 'G' };
  const upperSeq = sequence.toUpperCase();
  if (!upperSeq.match(/^[ATGC]*$/i)) {
    throw new Error('Invalid DNA sequence');
  }
  return upperSeq
    .split('')
    .map((base) => complement[base])
    .reverse()
    .join('');
}

/**
 * Calculate amino acid composition percentage
 * Returns an object with percentage of each amino acid type
 * @param {string} sequence - Protein sequence (single letter codes)
 * @returns {Object} Object with amino acid compositions
 */
function aminoAcidComposition(sequence) {
  if (typeof sequence !== 'string') {
    throw new Error('Sequence must be a string');
  }
  const upperSeq = sequence.toUpperCase();
  const validAAs = 'ACDEFGHIKLMNPQRSTVWY';
  if (!upperSeq.match(new RegExp(`^[${validAAs}]*$`))) {
    throw new Error('Invalid amino acid sequence');
  }
  if (upperSeq.length === 0) {
    return {};
  }

  const composition = {};
  for (let i = 0; i < upperSeq.length; i += 1) {
    const aa = upperSeq[i];
    composition[aa] = (composition[aa] || 0) + 1;
  }

  const result = {};
  Object.entries(composition).forEach(([aa, count]) => {
    result[aa] = (count / upperSeq.length) * 100;
  });

  return result;
}

/**
 * Calculate Hardy-Weinberg equilibrium allele frequency
 * @param {number} p - Frequency of allele A (0-1)
 * @returns {Object} Genotype frequencies {AA, Aa, aa}
 */
function hardyWeinbergFrequencies(p) {
  if (p < 0 || p > 1) {
    throw new Error('Allele frequency must be between 0 and 1');
  }
  const q = 1 - p;
  return {
    AA: p * p,
    Aa: 2 * p * q,
    aa: q * q,
  };
}

/**
 * Calculate population diversity (Shannon entropy)
 * @param {Array<number>} frequencies - Array of allele frequencies
 * @returns {number} Shannon entropy (diversity index)
 */
function shannonDiversity(frequencies) {
  if (!Array.isArray(frequencies)) {
    throw new Error('Frequencies must be an array');
  }
  const sum = frequencies.reduce((a, b) => a + b, 0);
  if (Math.abs(sum - 1) > 0.001) {
    // Normalize if not already
    frequencies = frequencies.map((f) => f / sum); // eslint-disable-line no-param-reassign
  }

  let entropy = 0;
  frequencies.forEach((f) => {
    if (f > 0) {
      entropy -= f * Math.log(f);
    }
  });
  return entropy;
}

// Create the plugin
const bioinformaticsPlugin = new Plugin(
  'bioinformatics',
  '1.0.0',
  'Bioinformatics formulas for sequence analysis, molecular biology, and population genetics',
  {}
);

// Register formulas
bioinformaticsPlugin.registerFormula('proteinMolecularWeight', proteinMolecularWeight, {
  description: 'Calculate protein molecular weight from sequence length',
  params: [{ name: 'sequenceLength', description: 'Number of amino acids' }],
  returns: 'Molecular weight (Daltons)',
});

bioinformaticsPlugin.registerFormula('gcContent', gcContent, {
  description: 'Calculate GC content of a DNA sequence',
  params: [{ name: 'sequence', description: 'DNA sequence' }],
  returns: 'GC content percentage (0-100)',
});

bioinformaticsPlugin.registerFormula('transcribeDNA', transcribeDNA, {
  description: 'Transcribe DNA sequence to RNA',
  params: [{ name: 'dnaSequence', description: 'DNA sequence' }],
  returns: 'RNA sequence',
});

bioinformaticsPlugin.registerFormula('reverseComplement', reverseComplement, {
  description: 'Get reverse complement of DNA sequence',
  params: [{ name: 'sequence', description: 'DNA sequence' }],
  returns: 'Reverse complement sequence',
});

bioinformaticsPlugin.registerFormula('aminoAcidComposition', aminoAcidComposition, {
  description: 'Calculate amino acid composition percentages',
  params: [{ name: 'sequence', description: 'Protein sequence' }],
  returns: 'Object with amino acid compositions (percentages)',
});

bioinformaticsPlugin.registerFormula('hardyWeinbergFrequencies', hardyWeinbergFrequencies, {
  description: 'Calculate genotype frequencies under Hardy-Weinberg equilibrium',
  params: [{ name: 'p', description: 'Allele A frequency (0-1)' }],
  returns: 'Object with genotype frequencies {AA, Aa, aa}',
});

bioinformaticsPlugin.registerFormula('shannonDiversity', shannonDiversity, {
  description: 'Calculate Shannon entropy (population diversity)',
  params: [{ name: 'frequencies', description: 'Array of allele frequencies' }],
  returns: 'Shannon entropy value',
});

module.exports = bioinformaticsPlugin;
