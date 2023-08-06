const ElasticSearchClient = require("../clients/elastic-search-client");

const ELASTIC_SEARCH_URL = "http://elasticsearch:9200";

const indexSuffix = (process.env.NODE_ENV === 'test') ? 'test' : undefined;

module.exports = new ElasticSearchClient(ELASTIC_SEARCH_URL, indexSuffix);
