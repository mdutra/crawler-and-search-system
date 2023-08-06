const app = require("./app");
const rabbitMQ = require("./config/rabbitmq");
const { handleCrawlerOutput } = require("./message-handler/crawler-handler");

const PORT = 3000;

async function main() {
    try {
        await rabbitMQ.connect();
    } catch (err) {
        console.error("Queue unavailable:", err);
    }

    const CRAWLER_OUTPUT_QUEUE = "crawler_output";
    rabbitMQ.consumeFromQueue(CRAWLER_OUTPUT_QUEUE, handleCrawlerOutput);

    app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}`);
    });
}

main();
