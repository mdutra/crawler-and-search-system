const CrawlerService = require("../services/crawler-service");

async function extractBenefitNumber({ cpf, login, senha }) {
    await CrawlerService.sendCrawlerRequest({ cpf, login, senha });
}

module.exports = {
    extractBenefitNumber,
};
