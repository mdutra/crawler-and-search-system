const { rabbitMQ, crawlerInputQueue, crawlerOutputQueue } = require('../../config/rabbitmq');

async function connectRabbitMQ() {
    await rabbitMQ.connect();
}

async function cleanAndDisconnectRabbitMQ() {
    await rabbitMQ.channel.assertQueue(crawlerInputQueue);
    await rabbitMQ.channel.purgeQueue(crawlerInputQueue);
    await rabbitMQ.channel.assertQueue(crawlerOutputQueue);
    await rabbitMQ.channel.purgeQueue(crawlerOutputQueue);
    await rabbitMQ.disconnect();
}

module.exports = {
    connectRabbitMQ,
    cleanAndDisconnectRabbitMQ,
};
