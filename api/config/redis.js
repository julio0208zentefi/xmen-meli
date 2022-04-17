require('redis')
const redis = require('redis')

const redisClient = function () {
  return redis.createClient({
    url: process.env.REDIS_URL
  })
}

module.exports = redisClient
