const DBConnection = require('../../config/cassandra')

// Model -----------------------------------------------------------

const DNAMatrixModel = DBConnection.loadSchema('DNAMatrix', {
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

DNAMatrixModel.updateStats = async function (updateCallback) {
  let mutantsCount = 0
  let humansCount = 0

  DNAMatrixModel.find({ is_mutant: false }, { allow_filtering: true }, function (error, humansRows) {
    humansCount = humansRows.length

    if (error) {
      console.log(error.stack)
    }

    DNAMatrixModel.find({ is_mutant: true }, { allow_filtering: true }, function (error, mutantsRows) {
      mutantsCount = mutantsRows.length

      if (error) {
        console.log(error.stack)
      }

      updateCallback.call(DNAMatrixModel, mutantsCount, humansCount)
    })
  })
}

// Exports -----------------------------------------------------------

module.exports = DNAMatrixModel
