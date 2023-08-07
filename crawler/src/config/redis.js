const RedisClient = require('../clients/redis-client');

const REDIS_HOST = "redis";
const REDIS_PORT = 6379;
let redisDb = 0;

const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'test') {
    redisDb = 1;
}

module.exports = new RedisClient({ host: REDIS_HOST, port: REDIS_PORT, db: redisDb });
