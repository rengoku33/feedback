const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'feedback_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

// POST endpoint for feedback
app.post('/feedback', (req, res) => {
  
  const { fullName, email, phoneNumber, products, feedback, productQuality, staffFriendliness, overallExperience, signature } = req.body;
  // Convert products array to JSON string
  const productsJson = JSON.stringify(products);

  const query = 'INSERT INTO feedback (fullName, email, phoneNumber, products, feedback, productQuality, staffFriendliness, overallExperience, signature) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [fullName, email, phoneNumber, productsJson, feedback, productQuality, staffFriendliness, overallExperience, signature], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.send({ message: 'Feedback submitted successfully!' });
  });
});


// GET endpoint for admin view
app.get('/admin', (req, res) => {
  const query = 'SELECT * FROM feedback';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
