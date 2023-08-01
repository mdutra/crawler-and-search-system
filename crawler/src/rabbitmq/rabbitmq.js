const amqplib = require("amqplib");

class RabbitMQServer {
    constructor(uri) {
        this.uri = uri;
        this.conn = null;
        this.channel = null;
    }

    async connect() {
        this.conn = await amqplib.connect(this.uri);
        this.channel = await this.conn.createChannel();
    }

    async publishToQueue(queue, msg) {
        await this.channel.assertQueue(queue, { durable: true });

        return this.channel.sendToQueue(queue, Buffer.from(msg));
    }

    async consumeFromQueue(queue, fn) {
        await this.channel.assertQueue(queue, { durable: true });

        this.channel.consume(queue, async (msg) => {
            if (msg === null) {
                console.log("Consumer cancelled by server");
            } else {
                const msgString = msg.content.toString();
                fn(msgString);
                this.channel.ack(msg);
            }
        });
    }
}

module.exports = RabbitMQServer;
