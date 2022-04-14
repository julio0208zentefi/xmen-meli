const ExpressCassandra = require('express-cassandra');
const CassandraDriver = require('cassandra-driver');

// Create connection -----------------------------------------------------------

const DBModelsConnection = ExpressCassandra.createClient({
    clientOptions: {
        contactPoints: [process.env.DB_HOST],
        localDataCenter: process.env.DB_DATA_CENTER,
        protocolOptions: { port: process.env.DB_PORT },
        keyspace: process.env.DB_KEY_SPACE,
        queryOptions: {consistency: ExpressCassandra.consistencies.one},
        socketOptions: { readTimeout: 60000 }
    },
    ormOptions: {
        defaultReplicationStrategy : {
            class: 'SimpleStrategy',
            replication_factor: 1
        },
        migration: 'safe'
    }
});

const DBConnection = new CassandraDriver.Client({
    contactPoints: [process.env.DB_HOST],
    localDataCenter: process.env.DB_DATA_CENTER,
    protocolOptions: { port: process.env.DB_PORT },
    keyspace: process.env.DB_KEY_SPACE
});

// Exports -----------------------------------------------------------

module.exports = { DBConnection, DBModelsConnection };
