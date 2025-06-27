# 🎬 Movie Recommender API + Frontend

A beginner-friendly full stack project that serves **movie recommendations** based on **mood** or **genre** using a custom-built REST API, **MySQL** as the database, and a clean, dark-themed **frontend** built with HTML, CSS & JS.

---

## 🚀 Features

- 🔧 Custom Express API with multiple endpoints
- 💾 Integrated MySQL database (CRUD support)
- 🎲 Mood/genre-based **random** movie suggestions
- 🌌 Dark-themed, animated frontend UI with toggleable sections
- 🧪 API tested via Postman + browser

---

## 📦 Setup Instructions

### 1. Clone the Repository

git clone https://github.com/your-username/movie-api-sql

cd movie-api-sql

### 2. Install Dependencies
npm install
### 3. Configure .env
Create a .env file in the root folder with:

PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=movie_api
Make sure .env is listed in your .gitignore.

### 4. Set Up the MySQL Database
Run this in MySQL:
CREATE DATABASE movie_api;

USE movie_api;

CREATE TABLE movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  genre VARCHAR(100),
  mood VARCHAR(100),
  release_year INT,
  rating FLOAT
);
You can also insert some starter movies if you like:

INSERT INTO movies (title, genre, mood, release_year, rating)
VALUES
('Zindagi Na Milegi Dobara', 'Adventure', 'inspirational', 2011, 8.2),
('PK', 'Comedy', 'thought-provoking', 2014, 8.1),
('Barfi', 'Drama', 'feel-good', 2012, 8.1);
### 5. Run the Server
node server.js
Then open in your browser:
http://localhost:3000

---

## 📡 API Endpoints
### Method	Endpoint	Description
GET	/api/movies	Get all movies
POST	/api/movies	Add a new movie
GET	/api/movies/recommend?mood=&genre=	Get a random suggestion (filtered)
PUT	/api/movies/:id	Update a movie (optional)
DELETE	/api/movies/:id	Delete a movie (optional)

---

## 🎨 Frontend Preview
✨ Designed with a dark theme and gradient purple-pink buttons
📋 3 Main Options: Show Movies / Add Movie / Suggest Movie
🔁 Toggleable sections and instant API interaction
💻 Built with HTML, CSS, and vanilla JavaScript

---

## ✅ API Testing with Keploy + CI/CD (Day 4)

- 🔁 Automated API Testing using Keploy and GitHub Actions
- 🧪 Triggered on every push/pull to `main`
- 📊 See test report below:
  

![Test Report Screenshot](./test-report-screenshots)

### 📂 CI/CD Configuration
See the [CI/CD Workflow](.github/workflows/keploy.yml)


---

### 🙌 Acknowledgements
Built with ❤️ using:

Node.js + Express

MySQL

HTML, CSS, and JS

Postman for testing

---

### 🧠 Future Improvements
🌍 Deploy on Render or Railway

🖼️ Show movie posters using OMDb/TMDB API

🔍 Add search/filter options

🔐 Add user authentication

🎭 Use AI to classify moods from descriptions

