const ElasticSearch = require("../elastic-search/elastic-search");

const elasticSearch = new ElasticSearch("http://elasticsearch:9200");

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
    const data = await elasticSearch.get({
        index: "benefit_number",
        id: cpf,
    });

    return data.body?._source;
}

module.exports = {
    getBenefitNumberByCpf,
    saveBenefitNumber,
};
