const { Client } = require("@elastic/elasticsearch");

class ElasticSearch {
    constructor(uri) {
        this.client = new Client({
            node: uri,
        });
    }

    async index({ index, id, body }) {
        await this.client.index({
            index,
            id,
            body,
        });
    }

    async get({ index, id }) {
        return this.client.get({
            index,
            id,
        });
    }
}

module.exports = ElasticSearch;
