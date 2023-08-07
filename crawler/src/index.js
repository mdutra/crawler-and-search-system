const { rabbitMQ, crawlerInputQueue } = require("./config/rabbitmq");
const { handleCrawlerRequest } = require('./message-handlers/crawler-handler');

async function main() {
    await rabbitMQ.connect();

    rabbitMQ.consumeFromQueue(crawlerInputQueue, handleCrawlerRequest);
}

main();
