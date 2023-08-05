const RabbitMQ = require("../rabbitmq/rabbitmq.js");
const Redis = require("../redis/redis");
const PortalService = require("./portal-service");

// TODO: use environemnt variables
const CRAWLER_INPUT_QUEUE = "crawler_input";
const CRAWLER_OUTPUT_QUEUE = "crawler_output";

const rabbitMQ = new RabbitMQ("amqp://rabbitmq:5672");
const redis = new Redis({ host: "redis", port: 6379 });

async function initConsumer() {
    try {
        await rabbitMQ.connect();
        consumeCrawlerRequests();
    } catch (err) {
        console.error("Queue unavailable:", err);
    }
}

function consumeCrawlerRequests() {
    rabbitMQ.consumeFromQueue(CRAWLER_INPUT_QUEUE, handleCrawlerRequest);

    console.log(`Waiting for messages on ${CRAWLER_INPUT_QUEUE} queue`);
}

async function handleCrawlerRequest(message) {
    console.log(`Received ${message} from ${CRAWLER_INPUT_QUEUE} queue`);

    const { cpf, login, senha } = JSON.parse(message);

    const hasHash = await redis.hasHash({ prefix: 'crawler_data', key: cpf });

    if (!hasHash) {
        console.log(`crawler data for ${cpf} not found in the cache`);

        const benefitNumber = await PortalService.extractBenefitNumber({
            cpf,
            login,
            senha,
        });
        await sendBenfitNumber({ cpf, benefitNumber });

        await redis.setHash({ prefix: 'crawler_data', key: cpf, data: { benefitNumber } });
    } else {
        console.log(`crawler data for ${cpf} found in the cache`);
    }
}

async function sendBenfitNumber({ cpf, benefitNumber }) {
    const msg = JSON.stringify({ cpf, benefitNumber });

    await rabbitMQ.publishToQueue(CRAWLER_OUTPUT_QUEUE, msg);

    console.log(`Sent message ${msg} to ${CRAWLER_OUTPUT_QUEUE}`);
}

module.exports = {
    initConsumer,
    consumeCrawlerRequests,
};
