const redis = require("../config/redis");

// TODO: use environemnt variables
const CRAWLER_OUTPUT_QUEUE = "crawler_output";

async function sendBenfitNumber({ cpf, benefitNumber }) {
    const msg = JSON.stringify({ cpf, benefitNumber });

    await redis.publishToQueue(CRAWLER_OUTPUT_QUEUE, msg);

    console.log(`Sent message ${msg} to ${CRAWLER_OUTPUT_QUEUE}`);
}

module.exports = {
    sendBenfitNumber,
};
