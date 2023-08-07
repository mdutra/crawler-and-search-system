const redis = require("../config/redis");
const PortalService = require("../services/portal-service");
const CrawlerService = require("../services/crawler-service");

async function handleCrawlerRequest(message) {
    console.log(`Received ${message} from queue`);

    const { cpf, login, senha } = JSON.parse(message);

    const hasHash = await redis.hasHash({ prefix: 'crawler_data', key: cpf });

    if (!hasHash) {
        console.log(`crawler data for ${cpf} not found in the cache`);

        const benefitNumber = await PortalService.extractBenefitNumber({
            cpf,
            login,
            senha,
        });
        await CrawlerService.sendBenfitNumber({ cpf, benefitNumber });

        await redis.setHash({ prefix: 'crawler_data', key: cpf, data: { benefitNumber } });
    } else {
        console.log(`crawler data for ${cpf} found in the cache`);
    }

    return !hasHash
}

module.exports = {
    handleCrawlerRequest,
}
