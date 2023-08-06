const ElasticSearchClient = require("../clients/elastic-search-client");

const ELASTIC_SEARCH_URL = "http://elasticsearch:9200";
const NODE_ENV = process.env.NODE_ENV;

const index = (NODE_ENV === 'test') ? 'benefit_numbers_test' : 'benefit_numbers';

module.exports = new ElasticSearchClient(ELASTIC_SEARCH_URL, index);
