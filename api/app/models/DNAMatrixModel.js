const { DBConnection, DBModelsConnection } = require('../../config/cassandra')

// Model -----------------------------------------------------------

const DNAMatrixModel = DBModelsConnection.loadSchema('DNAMatrix', {
  fields: {
    dna_matrix: 'text',
    is_mutant: 'boolean',
    created_at: {
      type: 'timestamp',
      default: { $db_function: 'toTimestamp(now())' }
    }
  },
  key: ['dna_matrix', 'is_mutant'],
  table_name: 'dna_matrix'
})

// Static Methods -----------------------------------------------------------

DNAMatrixModel.countHumanDNA = async function () {
  const query = 'SELECT COUNT(*) AS num FROM dna_matrix'
  return parseInt(await DBConnection.execute(query, [], { prepare: true }).then(res => res.first().num))
}

DNAMatrixModel.countMutantDNA = async function () {
  const query = 'SELECT COUNT(*) AS num FROM dna_matrix WHERE is_mutant = true ALLOW FILTERING;'
  return parseInt(await DBConnection.execute(query, [], { prepare: true }).then(res => res.first().num))
}

DNAMatrixModel.getRatioJSON = async function () {
  const countHumanDNA = await this.countHumanDNA()
  const countMutantDNA = await this.countMutantDNA()

  return {
    ratio: (countHumanDNA > 0) ? (countMutantDNA / countHumanDNA) : 0,
    count_human_dna: countHumanDNA,
    count_mutant_dna: countMutantDNA
  }
}

// Exports -----------------------------------------------------------

module.exports = DNAMatrixModel
