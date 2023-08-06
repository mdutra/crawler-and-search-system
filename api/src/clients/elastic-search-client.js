const { Client } = require("@elastic/elasticsearch");

class ElasticSearchClient {
    constructor(uri, index) {
        this.client = new Client({
            node: uri,
        });
        this.index = index;
    }

    async index({ id, body }) {
        await this.client.index({
            index: this.index,
            id,
            body,
        });
    }

    async get({ id }) {
        return this.client.get({
            index: this.index,
            id,
        });
    }
}

module.exports = ElasticSearchClient;
