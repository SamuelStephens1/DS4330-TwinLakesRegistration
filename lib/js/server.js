const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3000;

// Open SQLite database
const db = new sqlite3.Database('dummyDataTL.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Use the cors middleware
app.use(cors());

// Define your API endpoints
app.post('/api/login', (req, res) => {
  // Your login logic here
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Close the database connection on server shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing the database:', err.message);
    }
    process.exit(0);
  });
});
