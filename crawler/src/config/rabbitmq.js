const RabbitMQClient = require('../clients/rabbitmq-client');

const RABBIT_MQ_URI = "amqp://rabbitmq:5672";

module.exports = new RabbitMQClient(RABBIT_MQ_URI);
