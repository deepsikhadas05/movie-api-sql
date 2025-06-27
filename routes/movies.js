const express = require('express');

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: List of all movies
 */
function getAllMovies(db) {
  return (req, res) => {
    db.query('SELECT * FROM movies', (err, results) => {
      if (err) {
        console.error("❌ DB Error:", err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  };
}

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Add a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               genre:
 *                 type: string
 *               mood:
 *                 type: string
 *               release_year:
 *                 type: integer
 *               rating:
 *                 type: number
 *     responses:
 *       201:
 *         description: Movie added
 */
function addMovie(db) {
  return (req, res) => {
    const { title, genre, mood, release_year, rating } = req.body;
    db.query(
      'INSERT INTO movies (title, genre, mood, release_year, rating) VALUES (?, ?, ?, ?, ?)',
      [title, genre, mood, release_year, rating],
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Movie added', id: result.insertId });
      }
    );
  };
}

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               genre:
 *                 type: string
 *               mood:
 *                 type: string
 *               release_year:
 *                 type: integer
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Movie updated
 *       404:
 *         description: Movie not found
 */
function updateMovie(db) {
  return (req, res) => {
    const { title, genre, mood, release_year, rating } = req.body;
    db.query(
      'UPDATE movies SET title=?, genre=?, mood=?, release_year=?, rating=? WHERE id=?',
      [title, genre, mood, release_year, rating, req.params.id],
      (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json({ message: 'Movie updated' });
      }
    );
  };
}

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movie deleted
 *       404:
 *         description: Movie not found
 */
function deleteMovieById(db) {
  return (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM movies WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error("❌ DB Error:", err);
        return res.status(500).json({ error: 'Database error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.status(200).json({ message: 'Movie deleted' });
    });
  };
}

/**
 * @swagger
 * /api/movies/recommend:
 *   get:
 *     summary: Recommend a movie by mood or genre
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: mood
 *         schema:
 *           type: string
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A recommended movie
 *       404:
 *         description: No match found
 */
function recommendMovie(db) {
  return (req, res) => {
    const { mood, genre } = req.query;
    let query = 'SELECT * FROM movies';
    const filters = [];
    const values = [];

    if (mood) {
      filters.push('mood = ?');
      values.push(mood);
    }
    if (genre) {
      filters.push('genre = ?');
      values.push(genre);
    }

    if (filters.length > 0) {
      query += ' WHERE ' + filters.join(' AND ');
    }

    query += ' ORDER BY RAND() LIMIT 1';

    db.query(query, values, (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0) return res.status(404).json({ message: 'No match found' });
      res.json(results[0]);
    });
  };
}

// Export Router with Handlers Bound to DB
module.exports = (db) => {
  const router = express.Router();
  router.get('/', getAllMovies(db));
  router.post('/', addMovie(db));
  router.put('/:id', updateMovie(db));
  router.delete('/:id', deleteMovieById(db));
  router.get('/recommend', recommendMovie(db));
  return router;
};

// Export Functions for Unit Testing
module.exports.getAllMovies = getAllMovies;
module.exports.addMovie = addMovie;
module.exports.updateMovie = updateMovie;
module.exports.deleteMovieById = deleteMovieById;
module.exports.recommendMovie = recommendMovie;
