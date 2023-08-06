const RedisClient = require('../clients/redis-client');

const REDIS_HOST = "redis";
const REDIS_PORT = 6379;

module.exports = new RedisClient({ host: REDIS_HOST, port: REDIS_PORT });
