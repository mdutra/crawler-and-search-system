const RabbitMQ = require("../rabbitmq/rabbitmq");
const SearchService = require("./search-service");

// TODO: use environemnt variables
const CRAWLER_INPUT_QUEUE = "crawler_input";
const CRAWLER_OUTPUT_QUEUE = "crawler_output";

const rabbitMQ = new RabbitMQ("amqp://rabbitmq:5672");

async function initConsumer() {
    try {
        await rabbitMQ.connect();
        consumeCrawlerOutput();
    } catch (err) {
        console.error("Queue unavailable:", err);
    }
}

function consumeCrawlerOutput() {
    rabbitMQ.consumeFromQueue(CRAWLER_OUTPUT_QUEUE, handleCrawlerOutput);

    console.log(`Waiting for messages on ${CRAWLER_OUTPUT_QUEUE} queue`);
}

async function handleCrawlerOutput(message) {
    console.log(`Received ${message} from ${CRAWLER_OUTPUT_QUEUE} queue`);

    const { cpf, benefitNumber } = JSON.parse(message);

    await SearchService.saveBenefitNumber({ cpf, benefitNumber });
}

async function sendCrawlerRequest({ cpf, login, senha }) {
    const message = JSON.stringify({ cpf, login, senha });

    await rabbitMQ.publishToQueue(CRAWLER_INPUT_QUEUE, message);

    console.log(`sent ${message} to ${CRAWLER_INPUT_QUEUE} queue`);
}

module.exports = {
    initConsumer,
    sendCrawlerRequest,
};
