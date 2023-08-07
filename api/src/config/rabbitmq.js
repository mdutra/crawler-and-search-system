const RabbitMQClient = require('../clients/rabbitmq-client');

const uri = process.env.RABBITMQ_URI;

let crawlerInputQueue = process.env.CRAWLER_INPUT_QUEUE || "crawler_input";
let crawlerOutputQueue = process.env.CRAWLER_OUTPUT_QUEUE || "crawler_output";

const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'test') {
    crawlerInputQueue += '_api_test';
    crawlerOutputQueue += '_api_test';
}

module.exports = {
    rabbitMQ: new RabbitMQClient(uri),
    crawlerInputQueue,
    crawlerOutputQueue,
}
