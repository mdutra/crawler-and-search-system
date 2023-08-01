const QueueService = require("../services/queue-service");

async function extractBenefitNumber({ cpf, login, senha }) {
    await QueueService.sendCrawlerRequest({ cpf, login, senha });
}

module.exports = {
    extractBenefitNumber,
};
