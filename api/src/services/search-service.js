const elasticSearch = require("../config/elastic-search");
const { NotFoundError } = require("../error");

async function saveBenefitNumber({ cpf, benefitNumber }) {
    await elasticSearch.index({
        index: "benefit_number",
        id: cpf,
        body: {
            benefitNumber,
        },
    });
    console.log("saved benefitNumber on elastic search");
}

async function getBenefitNumberByCpf(cpf) {
    let data
    try {
        data = await elasticSearch.get({
            index: "benefit_number",
            id: cpf,
        });
    } catch (e) {
        if (e.meta?.statusCode === 404) {
            throw new NotFoundError('Resource not found');
        }

        throw e;
    }

    return data.body?._source;
}

module.exports = {
    getBenefitNumberByCpf,
    saveBenefitNumber,
};
