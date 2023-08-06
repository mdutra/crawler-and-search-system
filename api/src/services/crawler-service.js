const rabbitMQ = require("../config/rabbitmq");

// TODO: use environemnt variables
const CRAWLER_INPUT_QUEUE = "crawler_input";

async function sendCrawlerRequest({ cpf, login, senha }) {
    const message = JSON.stringify({ cpf, login, senha });

    await rabbitMQ.publishToQueue(CRAWLER_INPUT_QUEUE, message);

    console.log(`sent ${message} to ${CRAWLER_INPUT_QUEUE} queue`);
}

module.exports = {
    sendCrawlerRequest,
};
