const { Client } = require("@elastic/elasticsearch");

class ElasticSearchClient {
    constructor(uri, index) {
        this.client = new Client({
            node: uri,
        });
        this.indexName = index;
    }

    async index({ id, body }) {
        await this.client.index({
            index: this.indexName,
            id,
            body,
        });
    }

    async get({ id }) {
        return this.client.get({
            index: this.indexName,
            id,
        });
    }
}

module.exports = ElasticSearchClient;
