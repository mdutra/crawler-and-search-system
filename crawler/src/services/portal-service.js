const axios = require("axios");

const API_URL =
    "http://extratoblubeapp-env.eba-mvegshhd.sa-east-1.elasticbeanstalk.com";

async function authenticate({ login, senha }) {
    const res = await axios.post(`${API_URL}/login`, {
        login,
        senha,
    });

    const token = res.headers.authorization.split(" ")[1];

    return token;
}

async function fetchBenefitNumber({ token, cpf }) {
    const res = await axios.get(`${API_URL}/offline/listagem/${cpf}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    // TODO: use a list
    return res.data.beneficios.map((b) => b.nb)[0];
}

async function extractBenefitNumber({ cpf, login, senha }) {
    // TODO: check cache for token

    const token = await authenticate({ login, senha });
    // TODO: cache token

    const benifitNumber = await fetchBenefitNumber({ token, cpf });

    return benifitNumber;
}

module.exports = {
    extractBenefitNumber,
};
