const ExpressCassandra = require('express-cassandra')

// Create connection -----------------------------------------------------------

const DBConnection = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: [process.env.DB_HOST],
    localDataCenter: process.env.DB_DATA_CENTER,
    protocolOptions: { port: process.env.DB_PORT },
    keyspace: process.env.DB_KEY_SPACE,
    queryOptions: { consistency: ExpressCassandra.consistencies.one },
    socketOptions: { readTimeout: 60000 }
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 1
    },
    migration: 'safe'
  }
})

// Exports -----------------------------------------------------------

module.exports = DBConnection
