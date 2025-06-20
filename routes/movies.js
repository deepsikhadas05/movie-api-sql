const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // Get all movies
  router.get('/', (req, res) => {
    db.query('SELECT * FROM movies', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });

  // Add a new movie
  router.post('/', (req, res) => {
    const { title, genre, mood, release_year, rating } = req.body;
    db.query(
      'INSERT INTO movies (title, genre, mood, release_year, rating) VALUES (?, ?, ?, ?, ?)',
      [title, genre, mood, release_year, rating],
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: result.insertId });
      }
    );
  });

  // Update a movie
  router.put('/:id', (req, res) => {
    const { title, genre, mood, release_year, rating } = req.body;
    db.query(
      'UPDATE movies SET title=?, genre=?, mood=?, release_year=?, rating=? WHERE id=?',
      [title, genre, mood, release_year, rating, req.params.id],
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ updated: result.affectedRows });
      }
    );
  });

  // Delete a movie
  router.delete('/:id', (req, res) => {
    db.query('DELETE FROM movies WHERE id=?', [req.params.id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ deleted: result.affectedRows });
    });
  });

  // Recommend random movie by mood/genre
  router.get('/recommend', (req, res) => {
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
  });

  return router;
};
