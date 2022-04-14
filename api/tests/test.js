const DNAMatrix = require('../app/services/DNAMatrix')

// DNA Matrix
test('DNAMatrix - Get ALL Sequences', () => {

  let dnaMatrix = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];

  let returnSequences = ['AAAA', 'TGTG', 'GTGG', 'AGTA', 'GTAG',
    'CGTA', 'CTAC', 'AAAT', 'GTGA', 'CGAC',
    'GTAC', 'TAGC', 'TGCC', 'TACT', 'AATG',
    'TGCA', 'GACC', 'TACT', 'ACTA', 'CTAC',
    'TACT', 'TATG', 'ATGC', 'TGCC', 'GGAA',
    'GAAC', 'AACA', 'CTTA', 'TTAC', 'TACC',
    'GGGG', 'GGGT', 'GGTT', 'ACTG', 'CTGA',
    'TGAG', 'ATGC', 'TGCG', 'GCGA', 'CAGT',
    'AGTG', 'GTGC', 'TTAT', 'TATG', 'ATGT',
    'AGAA', 'GAAG', 'AAGG', 'CCCC', 'CCCT',
    'CCTA', 'TCAC', 'CACT', 'ACTG'];

  let sequences = DNAMatrix.getSequencesFromDNAMatrix(dnaMatrix);

  expect(sequences.sort()).toStrictEqual(returnSequences.sort());
});

test('DNAMatrix - Check Sanity Success', () => {

  let dnaMatrix = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];

  DNAMatrix.checkMatrixSanity(dnaMatrix);

  expect(1).toBe(1);
});

test('DNAMatrix - Check Sanity Error', () => {

  let dnaMatrix = ["ATGCGA","CAGTGC","TTATasdGT"];

  try {
    DNAMatrix.checkMatrixSanity(dnaMatrix);
  } catch(exception) {
    return expect(1).toBe(1);
  }

  expect(0).toBe(1);
});

test('DNAMatrix - Filtered Mutant Sequences', () => {

  let dnaMatrix = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
  let returnSequences = [ 'AAAA', 'GGGG', 'CCCC' ];

  let sequences = DNAMatrix.getSequencesFromDNAMatrix(dnaMatrix);
  let filteredSequences = DNAMatrix.filterMutantDNASequences(sequences);

  expect(filteredSequences.sort()).toStrictEqual(returnSequences.sort());
});

test('DNAMatrix - DNA is Mutant', () => {

  let dnaMatrix = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
  let isMutant = DNAMatrix.isMutantDNAMatrix(dnaMatrix);

  expect(isMutant).toBe(true);
});

test('DNAMatrix - DNA is NOT Mutant', () => {

  let dnaMatrix = ["ATGCGA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"];
  let isMutant = DNAMatrix.isMutantDNAMatrix(dnaMatrix);

  expect(isMutant).toBe(false);
});