const request = require('supertest');
const app = require('../app');
const elasticSearch = require('../config/elastic-search');

const api = request(app);

describe('search benefit number', () => {
    it('should not find benefit number', async () => {
        const cpf = "111.111.111-11";

        const response = await api.get(`/search/benefit-number/${cpf}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Resource not found');
    });

    it('should find benefit number', async () => {
        const cpf = "222.222.222-22";
        const benefitNumber = "123456";
        await elasticSearch.index(cpf, { benefitNumber });

        const response = await api.get(`/search/benefit-number/${cpf}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ benefitNumber });
    });

    it.todo('should return search engine unavailable 502');
});
