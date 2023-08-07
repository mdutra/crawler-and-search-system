const { rabbitMQ, crawlerInputQueue } = require("../config/rabbitmq");

async function sendCrawlerRequest({ cpf, login, senha }) {
    const message = JSON.stringify({ cpf, login, senha });

    await rabbitMQ.publishToQueue(crawlerInputQueue, message);

    console.log(`sent ${message} to ${crawlerInputQueue} queue`);
}

module.exports = {
    sendCrawlerRequest,
};
