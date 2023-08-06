const portal = require("../config/portal");

async function authenticate({ login, senha }) {
    const res = await portal.post('login', {
        login,
        senha,
    });

    const token = res.headers.authorization.split(" ")[1];

    return token;
}

async function fetchBenefitNumber({ token, cpf }) {
    const res = await portal.get(`offline/listagem/${cpf}`, {
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
