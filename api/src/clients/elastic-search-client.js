const { Client } = require("@elastic/elasticsearch");

class ElasticSearchClient {
    constructor(uri, indexSuffix) {
        this.client = new Client({
            node: uri,
        });

        this.indexSuffix = indexSuffix;
    }

    setIndex(index) {
        this.index = this.indexSuffix ? `${index}_${this.indexSuffix}` : index;
    }

    async index({ index, id, body }) {
        this.setIndex(index);

        await this.client.index({
            index: this.index,
            id,
            body,
        });
    }

    async get({ index, id }) {
        this.setIndex(index);

        return this.client.get({
            index: this.index,
            id,
        });
    }
}

module.exports = ElasticSearchClient;
