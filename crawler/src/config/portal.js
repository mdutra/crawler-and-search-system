const HttpClient = require("../clients/http-client");

const API_URL = "http://extratoblubeapp-env.eba-mvegshhd.sa-east-1.elasticbeanstalk.com";

module.exports = new HttpClient(API_URL);
