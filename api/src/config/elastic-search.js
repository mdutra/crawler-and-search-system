const ElasticSearchClient = require("../clients/elastic-search-client");

const ELASTIC_SEARCH_URL = "http://elasticsearch:9200";

module.exports = new ElasticSearchClient(ELASTIC_SEARCH_URL);
