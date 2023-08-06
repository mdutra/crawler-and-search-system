const amqplib = require("amqplib");

class RabbitMQClient {
    constructor(uri) {
        this.uri = uri;
        this.conn = null;
        this.channel = null;
    }

    async connect({ retries = 20, delay = 5000 } = {}) {
        for (let i = 0; i < retries; i++) {
            try {
                this.conn = await amqplib.connect(this.uri);
                console.log('Connected to RabbitMQ');
                break;
            } catch (error) {
                console.error(`Connection attempt ${i + 1} failed: ${error.message}`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }

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

        console.log(`Waiting for messages on ${queue} queue`);
    }
}

module.exports = RabbitMQClient;
