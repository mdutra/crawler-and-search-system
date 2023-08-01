const express = require("express");
const { catchAll, handleError } = require("./middlewares/custom-middlewares");
const crawlerRoutes = require("./routes/crawler-routes");
const QueueService = require("./services/queue-service");

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/crawler", crawlerRoutes);

app.use(catchAll);
app.use(handleError);

(async () => {
    await QueueService.initConsumer();

    app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}`);
    });
})();
