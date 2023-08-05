const IORedis = require("ioredis");

class Redis {
    constructor({ host, port }) {
        this.redis = new IORedis({
            host,
            port,
        });
    }

    async hasHash({ prefix, key }) {
        const hash = await this.redis.hgetall(`${prefix}:${key}`)

        return !!Object.keys(hash).length
    }

    async setHash({ prefix, key, data }) {
        const values = Object.entries(data).flat();

        await this.redis.hmset(`${prefix}:${key}`, ...values);
    }
}

module.exports = Redis;
