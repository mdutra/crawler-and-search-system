const HttpClient = require("../clients/http-client");

const API_URL = process.env.EXTRATO_CLUBE_API;

module.exports = new HttpClient(API_URL);
