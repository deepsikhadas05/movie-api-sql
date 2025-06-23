const { updateMovie } = require('../../routes/movies');

describe('updateMovie', () => {
  const mockDB = {
    query: jest.fn(),
  };

  const mockRes = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };

  const mockReq = {
    params: { id: '1' },
    body: {
      title: 'New Title',
      genre: 'Comedy',
      mood: 'funny',
      release_year: 2020,
      rating: 7.5
    },
  };

  it('should update a movie and return success message', () => {
    mockDB.query.mockImplementation((sql, values, callback) => {
      callback(null, { affectedRows: 1 });
    });

    updateMovie(mockDB)(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Movie updated' });
  });

  it('should return 404 if no movie was updated', () => {
    mockDB.query.mockImplementation((sql, values, callback) => {
      callback(null, { affectedRows: 0 });
    });

    updateMovie(mockDB)(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Movie not found' });
  });

  it('should return 500 on DB error', () => {
    mockDB.query.mockImplementation((sql, values, callback) => {
      callback(new Error('DB error'), null);
    });

    updateMovie(mockDB)(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
  });
});
