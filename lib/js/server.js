const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;

// Open SQLite database
const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Query the database for user
  db.get(
    'SELECT firstName, lastName, customerID, address, phone, email FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, row) => {
      if (err) {
        console.error('Error running SQL query:', err.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      } else if (row) {
        res.json({ success: true, user: row });
      } else {
        res.json({ success: false, message: 'Customer not found' });
      }
    }
  );
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
