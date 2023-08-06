const axios = require("axios");

class HttpClient {
    constructor(url) {
        this.url = url;
    }

    async get(path) {
        return axios.get(`${this.url}/${this.path}`);
    }

    async post(path, payload) {
        return axios.post(`${this.url}/${path}`, payload);
    }
}

module.exports = HttpClient;
