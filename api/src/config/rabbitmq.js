const RabbitMQClient = require('../clients/rabbitmq-client');

const RABBITMQ_URI = "amqp://rabbitmq:5672";

module.exports = new RabbitMQClient(RABBITMQ_URI);
