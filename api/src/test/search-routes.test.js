const request = require('supertest');
const app = require('../app');

const api = request(app);

describe('search benefit number', () => {
    it('should not find benefit number if index was not created', async () => {
        const response = await api.get('/search/benefit-number/111.111.111-11');

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Resource not found');
    });

    it.todo('should find benefit number');
    it.todo('should not find benefit number');
    it.todo('should return search engine unavailable 502');
});
