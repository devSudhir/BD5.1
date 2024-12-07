const express = require('express');
const { resolve } = require('path');
let { movieModel } = require('./models/track.model.js');
let { sequelize } = require('./lib/index.js');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3010;

app.use(express.static('static'));

const movies = [
  // Unique Bollywood Movies
  {
    id: 1,
    title: 'Dangal',
    director: 'Nitesh Tiwari',
    genre: 'Biography',
    release_year: 2016,
    rating: 4.8,
    actor: 'Aamir Khan',
    box_office_collection: 220,
  },
  {
    id: 2,
    title: 'Baahubali 2: The Conclusion',
    director: 'S.S. Rajamouli',
    genre: 'Action',
    release_year: 2017,
    rating: 4.7,
    actor: 'Prabhas',
    box_office_collection: 181,
  },
  {
    id: 3,
    title: 'PK',
    director: 'Rajkumar Hirani',
    genre: 'Comedy',
    release_year: 2014,
    rating: 4.6,
    actor: 'Aamir Khan',
    box_office_collection: 140,
  },
  {
    id: 4,
    title: 'Bajrangi Bhaijaan',
    director: 'Kabir Khan',
    genre: 'Drama',
    release_year: 2015,
    rating: 4.5,
    actor: 'Salman Khan',
    box_office_collection: 130,
  },
  {
    id: 5,
    title: 'Sultan',
    director: 'Ali Abbas Zafar',
    genre: 'Drama',
    release_year: 2016,
    rating: 4.3,
    actor: 'Salman Khan',
    box_office_collection: 120,
  },
  {
    id: 6,
    title: 'Sanju',
    director: 'Rajkumar Hirani',
    genre: 'Biography',
    release_year: 2018,
    rating: 4.4,
    actor: 'Ranbir Kapoor',
    box_office_collection: 120,
  },
  {
    id: 7,
    title: 'Padmaavat',
    director: 'Sanjay Leela Bhansali',
    genre: 'Drama',
    release_year: 2018,
    rating: 4.2,
    actor: 'Ranveer Singh',
    box_office_collection: 112,
  },
  {
    id: 8,
    title: '3 Idiots',
    director: 'Rajkumar Hirani',
    genre: 'Comedy',
    release_year: 2009,
    rating: 4.9,
    actor: 'Aamir Khan',
    box_office_collection: 202,
  },
  {
    id: 9,
    title: 'Chennai Express',
    director: 'Rohit Shetty',
    genre: 'Comedy',
    release_year: 2013,
    rating: 4.0,
    actor: 'Shah Rukh Khan',
    box_office_collection: 100,
  },
  {
    id: 10,
    title: 'War',
    director: 'Siddharth Anand',
    genre: 'Action',
    release_year: 2019,
    rating: 4.3,
    actor: 'Hrithik Roshan',
    box_office_collection: 100,
  },
  {
    id: 11,
    title: 'Kabir Singh',
    director: 'Sandeep Reddy Vanga',
    genre: 'Romance',
    release_year: 2019,
    rating: 4.2,
    actor: 'Shahid Kapoor',
    box_office_collection: 80,
  },
  {
    id: 12,
    title: 'Gully Boy',
    director: 'Zoya Akhtar',
    genre: 'Drama',
    release_year: 2019,
    rating: 4.4,
    actor: 'Ranveer Singh',
    box_office_collection: 75,
  },
  {
    id: 13,
    title: 'Andhadhun',
    director: 'Sriram Raghavan',
    genre: 'Thriller',
    release_year: 2018,
    rating: 4.5,
    actor: 'Ayushmann Khurrana',
    box_office_collection: 60,
  },
  {
    id: 14,
    title: 'Tumbbad',
    director: 'Rahi Anil Barve',
    genre: 'Horror',
    release_year: 2018,
    rating: 4.3,
    actor: 'Sohum Shah',
    box_office_collection: 50,
  },
  {
    id: 15,
    title: 'Stree',
    director: 'Amar Kaushik',
    genre: 'Comedy',
    release_year: 2018,
    rating: 4.0,
    actor: 'Rajkummar Rao',
    box_office_collection: 60,
  },
  {
    id: 16,
    title: 'Badhaai Ho',
    director: 'Amit Sharma',
    genre: 'Comedy',
    release_year: 2018,
    rating: 4.2,
    actor: 'Ayushmann Khurrana',
    box_office_collection: 45,
  },
  {
    id: 17,
    title: 'Article 15',
    director: 'Anubhav Sinha',
    genre: 'Drama',
    release_year: 2019,
    rating: 4.6,
    actor: 'Ayushmann Khurrana',
    box_office_collection: 35,
  },
  {
    id: 18,
    title: 'URI: The Surgical Strike',
    director: 'Aditya Dhar',
    genre: 'Action',
    release_year: 2019,
    rating: 4.7,
    actor: 'Vicky Kaushal',
    box_office_collection: 70,
  },
];

let db;
(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.get('/db_seed', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await movieModel.bulkCreate(movies);
    res.status(200).json({ message: 'Database seed Successfull' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/movies', async (req, res) => {
  const query = 'Select * from movies';
  const result = await db.all(query, []);
  res.status(200).json({ movies: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
