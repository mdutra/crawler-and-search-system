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

    return res.data.beneficios.map((b) => b.nb)[0];
}

async function extractBenefitNumber({ cpf, login, senha }) {
    try {
        const token = await authenticate({ login, senha });

        const benefitNumber = await fetchBenefitNumber({ token, cpf });

        return benefitNumber;
    } catch (e) {
        console.error(e.message);
        throw new Error('Failed to fetch extratoclube API');
    }
}

module.exports = {
    extractBenefitNumber,
};
