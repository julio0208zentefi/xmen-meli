'use strict'

require('express')
const DNAMatrix = []

// Constants
DNAMatrix.SEQUENCE_LENGTH = 4
DNAMatrix.SEQUENCE_REGEX = /^[ATCG]+$/
DNAMatrix.MUTANT_SEQUENCES = ['AAAA', 'TTTT', 'CCCC', 'GGGG']
DNAMatrix.MUTANT_SEQUENCES_MIN_OCURRENCES = 2

// Private static Methods
DNAMatrix._getObliqueSequences = function (dnaMatrix) {
  const sequences = []
  let sequence

  for (let rowIndex = 0; rowIndex <= dnaMatrix.length - DNAMatrix.SEQUENCE_LENGTH; rowIndex++) {
    for (let colIndex = 0; colIndex <= dnaMatrix.length - DNAMatrix.SEQUENCE_LENGTH; colIndex++) {
      sequence = ''

      for (let offset = 0; offset < DNAMatrix.SEQUENCE_LENGTH; offset++) {
        sequence += dnaMatrix[rowIndex + offset][colIndex + offset]
      }

      sequences.push(sequence)
    }

    for (let colIndex = dnaMatrix.length - 1; colIndex > dnaMatrix.length - DNAMatrix.SEQUENCE_LENGTH; colIndex--) {
      sequence = ''

      for (let offset = 0; offset < DNAMatrix.SEQUENCE_LENGTH; offset++) {
        sequence += dnaMatrix[rowIndex + offset][colIndex - offset]
      }

      sequences.push(sequence)
    }
  }

  console.log('[DNAMatrix] [Oblique Sequences]', sequences)

  return sequences
}

DNAMatrix._getHorizontalSequences = function (dnaMatrix) {
  const sequences = []

  for (let rowIndex = 0; rowIndex < dnaMatrix.length; rowIndex++) {
    const row = dnaMatrix[rowIndex]

    for (let colIndex = 0; colIndex < row.length - DNAMatrix.SEQUENCE_LENGTH + 1; colIndex++) {
      sequences.push(row.slice(colIndex, colIndex + DNAMatrix.SEQUENCE_LENGTH))
    }
  }

  console.log('[DNAMatrix] [Horizontal Sequences]', sequences)

  return sequences
}

DNAMatrix._getVerticalSequences = function (dnaMatrix) {
  const sequences = []

  for (let colIndex = 0; colIndex < dnaMatrix.length; colIndex++) {
    for (let rowIndex = 0; rowIndex < dnaMatrix.length - DNAMatrix.SEQUENCE_LENGTH + 1; rowIndex++) {
      let sequence = ''

      for (let cellIndex = 0; cellIndex < DNAMatrix.SEQUENCE_LENGTH; cellIndex++) {
        sequence += dnaMatrix[rowIndex + cellIndex][colIndex]
      }

      sequences.push(sequence)
    }
  }

  console.log('[DNAMatrix] [Vertical Sequences]', sequences)

  return sequences
}

// Public static Methods
DNAMatrix.checkMatrixSanity = function (dnaMatrix) {
  const dnaMatrixLength = dnaMatrix.length

  if (dnaMatrixLength < DNAMatrix.SEQUENCE_LENGTH) {
    throw new Error('DNA Matrix Invalid Length')
  }

  for (let rowIndex = 0; rowIndex < dnaMatrixLength; rowIndex++) {
    const row = dnaMatrix[rowIndex]

    if (row.length !== dnaMatrixLength) {
      throw new Error(`DNA Matrix Row ${rowIndex} Invalid Length`)
    }

    if (row.match(DNAMatrix.SEQUENCE_REGEX) === null) {
      throw new Error(`DNA Matrix Row ${rowIndex} Invalid Caracters`)
    }
  }
}

DNAMatrix.getSequencesFromDNAMatrix = function (dnaMatrix) {
  let sequences = this._getObliqueSequences(dnaMatrix)
  sequences = sequences.concat(this._getVerticalSequences(dnaMatrix))
  sequences = sequences.concat(this._getHorizontalSequences(dnaMatrix))

  console.log('[DNAMatrix] [Sequences]', sequences)

  return sequences
}

DNAMatrix.filterMutantDNASequences = function (dnaSequences) {
  const filteredSequences = dnaSequences.filter((sequence) => {
    return DNAMatrix.MUTANT_SEQUENCES.indexOf(sequence) >= 0
  })

  console.log('[DNAMatrix] [Filtered Mutant Sequences]', filteredSequences)

  return filteredSequences
}

DNAMatrix.isMutantDNAMatrix = function (dnaMatrix) {
  const sequences = this.getSequencesFromDNAMatrix(dnaMatrix)
  const mutantSequences = this.filterMutantDNASequences(sequences)

  return mutantSequences.length >= DNAMatrix.MUTANT_SEQUENCES_MIN_OCURRENCES
}

// -------------------------------------------

module.exports = DNAMatrix
