#!/usr/bin/env node
/**
 * Example: Bioinformatics - DNA/Protein Analysis
 * Demonstrates usage of bioinformatics plugin for sequence analysis
 */

const scientificToolkit = require('../src/index');

const { plugins, latex } = scientificToolkit;
const manager = new plugins.PluginManager();
manager.register(plugins.builtin.bioinformatics);

console.log('=== DNA/Protein Sequence Analysis ===\n');

// Example DNA sequence (simulated promoter region)
const dnaSequence = 'ATGCTAGCTAGCTACGATCGATCGATCGATCGATCGATCGATCGATCG';
console.log(`Input DNA Sequence: ${dnaSequence}\n`);

// Calculate GC content
console.log('Calculating GC Content:');
const gcContent = manager.executeFormula('bioinformatics', 'gcContent', dnaSequence);
console.log(`GC Content: ${gcContent.toFixed(2)}%\n`);

// Transcribe to RNA
console.log('Transcribing DNA to RNA:');
const rnaSequence = manager.executeFormula('bioinformatics', 'transcribeDNA', dnaSequence);
console.log(`RNA Sequence: ${rnaSequence}\n`);

// Get reverse complement
console.log('Computing Reverse Complement:');
const revComplement = manager.executeFormula('bioinformatics', 'reverseComplement', dnaSequence);
console.log(`Reverse Complement: ${revComplement}\n`);

// Protein sequence example
const proteinSequence = 'MKVLWAALLVTFLAGCAKAKWVQAQQWSN'; // Example protein
console.log(`Input Protein Sequence: ${proteinSequence}\n`);

// Calculate protein molecular weight
console.log('Calculating Protein Properties:');
const proteinLength = proteinSequence.length;
const proteinMW = manager.executeFormula('bioinformatics', 'proteinMolecularWeight', proteinLength);
console.log(`Protein Length: ${proteinLength} amino acids`);
console.log(`Estimated Molecular Weight: ${(proteinMW / 1000).toFixed(2)} kDa\n`);

// Calculate amino acid composition
console.log('Amino Acid Composition:');
const composition = manager.executeFormula(
  'bioinformatics',
  'aminoAcidComposition',
  proteinSequence
);
Object.entries(composition).forEach(([aa, percentage]) => {
  console.log(`${aa}: ${percentage.toFixed(2)}%`);
});

// Hardy-Weinberg equilibrium
console.log('\nHardy-Weinberg Equilibrium (p = 0.6 allele frequency):');
const hwFreq = manager.executeFormula('bioinformatics', 'hardyWeinbergFrequencies', 0.6);
console.log(`Genotype AA: ${(hwFreq.AA * 100).toFixed(2)}%`);
console.log(`Genotype Aa: ${(hwFreq.Aa * 100).toFixed(2)}%`);
console.log(`Genotype aa: ${(hwFreq.aa * 100).toFixed(2)}%`);

// Export as LaTeX
const latexExporter = latex.LaTeXExporter;
const bioResults = {
  'GC\\_content': gcContent,
  'MW\\_protein': proteinMW,
};

console.log('\nLaTeX Export:');
console.log(latexExporter.formatResults(bioResults, '%', 2));
