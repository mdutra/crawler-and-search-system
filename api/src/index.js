const express = require("express");
const cors = require("cors");
const { catchAll, handleError } = require("./middlewares/custom-middlewares");
const crawlerRoutes = require("./routes/crawler-routes");
const searchRoutes = require("./routes/search-routes");
const rabbitMQ = require("./config/rabbitmq");
const { handleCrawlerOutput } = require("./message-handler/crawler-handler");

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/crawler", crawlerRoutes);
app.use("/search", searchRoutes);

app.use(catchAll);
app.use(handleError);

async function main() {
    try {
        await rabbitMQ.connect();
    } catch (err) {
        console.error("Queue unavailable:", err);
    }

    const CRAWLER_OUTPUT_QUEUE = "crawler_output";
    rabbitMQ.consumeFromQueue(CRAWLER_OUTPUT_QUEUE, handleCrawlerOutput);
    console.log(`Waiting for messages on ${CRAWLER_OUTPUT_QUEUE} queue`);

    app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}`);
    });
}

main();
