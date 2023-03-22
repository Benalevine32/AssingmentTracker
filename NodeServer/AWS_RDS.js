const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());

const connection = mysql.createConnection({
    host: 'assignmenttracker.ci3higxjoes6.us-east-1.rds.amazonaws.com',
    user: 'awsuser',
    password: 'password123!',
    database: 'assignmentTracker', 
    port: 3306
})

app.get('/api/classes', (req, res) => {
    connection.query('SELECT * FROM classes', (error, results) => {
      if (error) {
        console.error('Error executing query Classes:', error);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });
  
  app.get('/api/top3Assignments', (req, res) => {
    connection.query('SELECT * FROM assignments ORDER BY difficulty DESC LIMIT 3', (error, results) => {
      if (error) {
        console.error('Error executing query Assignments:', error);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });
const port = process.env.PORT || 3001;

app.listen(port, ()=>{
  console.log(`Server Listening on port ${port}`);
});
