const DBConnection = require('../../config/cassandra');

// Model -----------------------------------------------------------

const DNAMatrixModel = DBConnection.loadSchema('DNAMatrix', {
    fields:{
        dna_matrix: "text",
        is_mutant: "boolean",
        created_at: {
            type: "timestamp",
            default: {"$db_function": "toTimestamp(now())"}
        }
    },
    key: ["dna_matrix", "is_mutant"],
    table_name: "dna_matrix"
});


// Exports -----------------------------------------------------------

module.exports = DNAMatrixModel;