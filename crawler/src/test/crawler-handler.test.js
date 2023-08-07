const { rabbitMQ, crawlerOutputQueue } = require('../config/rabbitmq');
const { handleCrawlerRequest } = require('../message-handlers/crawler-handler');
const { cleanAndDisconnectRabbitMQ } = require('./config/test-config');
const redis = require('../config/redis');
const HttpClient = require('../clients/http-client');

jest.mock('../clients/http-client', () => {
  return jest.fn().mockImplementation(() => ({
    post: jest.fn().mockResolvedValue({
        headers: { authorization: 'Bearer fake_token' },
    }),
    get: jest.fn().mockResolvedValue({
        data: { beneficios: [{ nb: "123456" }] },
    })
  }));
})

describe('handle crawler request', () => {
    beforeAll(async () => {
        await rabbitMQ.connect();
    })

    afterAll(async () => {
        await cleanAndDisconnectRabbitMQ();
        redis.disconnect();
    })

    it('should process request and send response to output queue', async () => {
        const cpf = "111.111.111-11";
        await redis.delHash({ prefix: `crawler_data`, key: cpf });
        const input = {
            cpf,
            login: "login",
            senha: "senha",
        }

        const result = await handleCrawlerRequest(JSON.stringify(input));

        expect(result).toBe(true);
        await new Promise((resolve) => {
            rabbitMQ.consumeFromQueue(crawlerOutputQueue, (msg) => {
                expect(msg).toEqual(JSON.stringify({
                    cpf: input.cpf,
                    benefitNumber: "123456",
                }));
                resolve();
            });
        });
    });

    it('should find data on cache', async () => {
        const cpf = "222.222.222-22";
        await redis.setHash({ prefix: `crawler_data`, key: cpf, data: { benefitNumber: "123456" } });
        const input = {
            cpf,
            login: "login",
            senha: "senha",
        }

        const result = await handleCrawlerRequest(JSON.stringify(input));

        expect(result).toBe(false);
    })
});
