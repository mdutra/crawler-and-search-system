const SearchService = require('../services/search-service');

async function handleCrawlerOutput(message) {
    console.log(`Received ${message} from ${CRAWLER_OUTPUT_QUEUE} queue`);

    const { cpf, benefitNumber } = JSON.parse(message);

    await SearchService.saveBenefitNumber({ cpf, benefitNumber });
}

module.exports = {
    handleCrawlerOutput,
}
