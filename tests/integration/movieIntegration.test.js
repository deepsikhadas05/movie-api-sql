const request = require('supertest');
const app = require('../../server');

describe('Integration Test - Movie API', () => {
  const newMovie = {
    title: '3 Idiots',
    genre: 'Drama',
    mood: 'inspirational',
    release_year: 2009,
    rating: 8.4,
  };

  let createdId;

  it('POST /api/movies → should create a movie', async () => {
    const res = await request(app).post('/api/movies').send(newMovie);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Movie added');
    createdId = res.body.id || 1; // fallback if no ID returned
  });

  it('GET /api/movies → should return list of movies', async () => {
    const res = await request(app).get('/api/movies');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('DELETE /api/movies/:id → should delete the created movie', async () => {
    const res = await request(app).delete(`/api/movies/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Movie deleted');
  });
});

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

afterAll((done) => {
  db.end(done); // ✅ Close DB connection
});