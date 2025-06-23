const moviesRoute = require('../../routes/movies');

describe('Unit Test - Add Movie Logic', () => {
  it('should return 201 on successful insert', () => {
    const mockDb = {
      query: (sql, values, callback) => {
        callback(null, { affectedRows: 1 });
      },
    };

    const router = moviesRoute(mockDb);
    const req = {
      body: {
        title: 'PK',
        genre: 'Comedy',
        mood: 'thoughtful',
        release_year: 2014,
        rating: 8.1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const handler = router.stack.find(r => r.route.path === '/' && r.route.methods.post).route.stack[0].handle;
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
