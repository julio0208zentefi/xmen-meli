const redis = require("redis");

let Redis = {};

// Primitive Methods
Redis.setItem = async function(key, value) {

    const redis = require('redis')

    let client = await redis.createClient({
        url: process.env.REDIS_URL
    });

    await client.connect();
    await client.set(key, value);

};

Redis.getItem = async function(key, defaultValue) {

    const redis = require('redis')

    let client = await redis.createClient({
        url: process.env.REDIS_URL
    });

    await client.connect();
    let value = await client.get(key);

    if(value === null) {
        value = defaultValue;
    }

    return value;
};

// JSON Methods
Redis.setJSON = async function(key, value) {

    let json = JSON.stringify(value);
    return await Redis.setItem(key, json);

};

Redis.getJSON = async function(key, defaultValue) {

    let value = await Redis.getItem(key);

    if(!value) {
        value = defaultValue;
    } else {
        value = JSON.parse(value);
    }
    return value;

};

//-------------------------------------------

module.exports = Redis;