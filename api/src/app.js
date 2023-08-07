const express = require("express");
const cors = require("cors");
const { catchAll, handleError } = require("./middlewares/custom-middlewares");
const crawlerRoutes = require("./routes/crawler-routes");
const searchRoutes = require("./routes/search-routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/crawler", crawlerRoutes);
app.use("/search", searchRoutes);

app.use(catchAll);
app.use(handleError);

module.exports = app;
