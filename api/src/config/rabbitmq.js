const RabbitMQServer = require('../servers/rabbitmq-server');

const RABBITMQ_URI = "amqp://rabbitmq:5672";

module.exports = new RabbitMQServer(RABBITMQ_URI);
