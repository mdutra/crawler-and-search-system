const { Client } = require("@elastic/elasticsearch");

class ElasticSearchClient {
    constructor(uri, indexSuffix) {
        this.client = new Client({
            node: uri,
        });

        this.indexSuffix = indexSuffix;
    }

    async index({ index, id, body }) {
        await this.client.index({
            index: this.indexSuffix ? `${index}_${this.indexSuffix}` : index,
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

module.exports = ElasticSearchClient;
