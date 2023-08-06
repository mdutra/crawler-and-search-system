const rabbitMQ = require("./config/rabbitmq");
const { handleCrawlerRequest } = require('./message-handlers/crawler-handler');

async function main() {
    await rabbitMQ.connect();

    const CRAWLER_INPUT_QUEUE = "crawler_input";
    rabbitMQ.consumeFromQueue(CRAWLER_INPUT_QUEUE, handleCrawlerRequest);
}

main();
