const { rabbitMQ, crawlerOutputQueue } = require("../config/rabbitmq");

async function sendBenfitNumber({ cpf, benefitNumber }) {
    const msg = JSON.stringify({ cpf, benefitNumber });

    await rabbitMQ.publishToQueue(crawlerOutputQueue, msg);

    console.log(`Sent message ${msg} to ${crawlerOutputQueue}`);
}

module.exports = {
    sendBenfitNumber,
};
