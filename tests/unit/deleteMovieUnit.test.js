const { deleteMovieById } = require('../../routes/movies');

describe('deleteMovieById', () => {
  const mockDB = {
    query: jest.fn(),
  };

  const mockRes = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };

  it('should delete a movie and return success message', () => {
    const mockReq = { params: { id: '1' } };

    mockDB.query.mockImplementation((sql, values, callback) => {
      callback(null, { affectedRows: 1 });
    });

    deleteMovieById(mockDB)(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Movie deleted' });
  });

  it('should return 404 if no movie was deleted', () => {
    const mockReq = { params: { id: '999' } };

    mockDB.query.mockImplementation((sql, values, callback) => {
      callback(null, { affectedRows: 0 });
    });

    deleteMovieById(mockDB)(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Movie not found' });
  });

  it('should return 500 on DB error', () => {
    const mockReq = { params: { id: '1' } };

    mockDB.query.mockImplementation((sql, values, callback) => {
      callback(new Error('DB Error'), null);
    });

    deleteMovieById(mockDB)(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
  });
});
