require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const swaggerSetup = require('./swagger'); // ✅ Swagger Setup File
const movieRoutes = require('./routes/movies'); // ✅ Movie Routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
    process.exit(1);
  }
  console.log('✅ MySQL Connected');
});

// Mount API Routes
app.use('/api/movies', movieRoutes(db));

// Swagger Setup (Must come after routes)
swaggerSetup(app);

// Start Server (only if not in test environment)
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// Export app for testing
module.exports = app;
