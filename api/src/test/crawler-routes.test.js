const request = require('supertest');
const { connectRabbitMQ, cleanAndDisconnectRabbitMQ } = require('./config/test-config');
const app = require('../app');

const api = request(app);

describe('crawler', () => {
    beforeAll(async () => {
        await connectRabbitMQ();
    })

    afterAll(async () => {
        await cleanAndDisconnectRabbitMQ();
    })

    it('should publish cpf to queue', async () => {
        const response = await api
            .post('/crawler/extract-benefit-number')
            .send({
                cpf: "111.111.111-11",
                login: "login",
                senha: "senha",
            })

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ ok: true });
    });

    it.todo('should queue be unavailable 502');
});
