// tests/unit/getAllMoviesUnit.test.js
const getAllMovies = require('../../routes/movies').getAllMovies;

describe('getAllMovies', () => {
  const mockDB = {
    query: jest.fn(),
  };

  const mockRes = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };

  it('should return list of movies', () => {
    const movies = [{ title: 'PK' }, { title: 'Barfi' }];
    mockDB.query.mockImplementation((sql, callback) => {
      callback(null, movies);
    });

    getAllMovies(mockDB)({}, mockRes);

    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).toHaveBeenCalledWith(movies);
  });

  it('should return 500 if DB fails', () => {
    mockDB.query.mockImplementation((sql, callback) => {
      callback(new Error('DB Error'), null);
    });

    getAllMovies(mockDB)({}, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
  });
});