const Redis = require("ioredis");

class RedisClient {
    constructor({ host, port }) {
        this.redis = new Redis({
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

    async delHash({ prefix, key }) {
        await this.redis.del(`${prefix}:${key}`);
    }

    async disconnect() {
        this.redis.quit();
    }
}

module.exports = RedisClient;
