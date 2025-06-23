const request = require('supertest');
const app = require('../../server'); // Make sure server.js exports `app`

describe('API Test - GET /api/movies', () => {
  it('should return an array of movies', async () => {
    const res = await request(app).get('/api/movies');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});

// ✅ Optional cleanup hook if you start/stop server or connect to DB here
afterAll((done) => {
  done(); // No DB or server cleanup needed here (handled in integration test)
});
