const app = require("./app");
const { rabbitMQ, crawlerOutputQueue } = require("./config/rabbitmq");
const { handleCrawlerOutput } = require("./message-handler/crawler-handler");

const port = process.env.API_PORT || 3000;

async function main() {
    try {
        await rabbitMQ.connect();
    } catch (err) {
        console.error("Queue unavailable:", err);
    }

    rabbitMQ.consumeFromQueue(crawlerOutputQueue, handleCrawlerOutput);

    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`);
    });
}

main();
