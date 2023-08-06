const ElasticSearchServer = require("../servers/elastic-search-server");

const ELASTIC_SEARCH_URL = "http://elasticsearch:9200";

module.exports = new ElasticSearchServer(ELASTIC_SEARCH_URL);
