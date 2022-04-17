require('redis')
const redis = require('redis')

const redisClient = function() {

    const client = redis.createClient({
        url: process.env.REDIS_URL
    })

    client.connect()
    return client
}

module.exports = redisClient
