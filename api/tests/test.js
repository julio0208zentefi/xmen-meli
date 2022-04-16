const DNAMatrix = require('../app/services/DNAMatrix')

// DNA Matrix
test('DNAMatrix - Get ALL Sequences', () => {
  const dnaMatrix = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG']

  const returnSequences = ['AAAA', 'TGTG', 'GTGG', 'AGTA', 'GTAG',
    'CGTA', 'CTAC', 'AAAT', 'GTGA', 'CGAC',
    'GTAC', 'TAGC', 'TGCC', 'TACT', 'AATG',
    'TGCA', 'GACC', 'TACT', 'ACTA', 'CTAC',
    'TACT', 'TATG', 'ATGC', 'TGCC', 'GGAA',
    'GAAC', 'AACA', 'CTTA', 'TTAC', 'TACC',
    'GGGG', 'GGGT', 'GGTT', 'ACTG', 'CTGA',
    'TGAG', 'ATGC', 'TGCG', 'GCGA', 'CAGT',
    'AGTG', 'GTGC', 'TTAT', 'TATG', 'ATGT',
    'AGAA', 'GAAG', 'AAGG', 'CCCC', 'CCCT',
    'CCTA', 'TCAC', 'CACT', 'ACTG']

  const sequences = DNAMatrix.getSequencesFromDNAMatrix(dnaMatrix)

  expect(sequences.sort()).toStrictEqual(returnSequences.sort())
})

test('DNAMatrix - Check Sanity Success', () => {
  const dnaMatrix = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG']

  DNAMatrix.checkMatrixSanity(dnaMatrix)

  expect(1).toBe(1)
})

test('DNAMatrix - Check Sanity Error', () => {
  const dnaMatrix = ['ATGCGA', 'CAGTGC', 'TTATasdGT']

  try {
    DNAMatrix.checkMatrixSanity(dnaMatrix)
  } catch (exception) {
    return expect(1).toBe(1)
  }

  expect(0).toBe(1)
})

test('DNAMatrix - Filtered Mutant Sequences', () => {
  const dnaMatrix = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG']
  const returnSequences = ['AAAA', 'GGGG', 'CCCC']

  const sequences = DNAMatrix.getSequencesFromDNAMatrix(dnaMatrix)
  const filteredSequences = DNAMatrix.filterMutantDNASequences(sequences)

  expect(filteredSequences.sort()).toStrictEqual(returnSequences.sort())
})

test('DNAMatrix - DNA is Mutant', () => {
  const dnaMatrix = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG']
  const isMutant = DNAMatrix.isMutantDNAMatrix(dnaMatrix)

  expect(isMutant).toBe(true)
})

test('DNAMatrix - DNA is NOT Mutant', () => {
  const dnaMatrix = ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG']
  const isMutant = DNAMatrix.isMutantDNAMatrix(dnaMatrix)

  expect(isMutant).toBe(false)
})
