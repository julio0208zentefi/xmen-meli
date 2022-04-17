require('redis')
const redisClient = require('../../config/redis')

const Redis = {}

// Primitive Methods
Redis.setItem = async function (key, value) {

  const client = redisClient()
  await client.set(key, value)
}

Redis.getItem = async function (key, defaultValue) {
  const client = redisClient()
  let value = await client.get(key)

  if (value === null) {
    value = defaultValue
  }

  return value
}

// JSON Methods
Redis.setJSON = async function (key, value) {
  const json = JSON.stringify(value)
  return await Redis.setItem(key, json)
}

Redis.getJSON = async function (key, defaultValue) {
  let value = await Redis.getItem(key)

  if (!value) {
    value = defaultValue
  } else {
    value = JSON.parse(value)
  }
  return value
}

// -------------------------------------------

module.exports = Redis
