const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

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

  app.post('/api/insertClasses', (req, res) => {
    console.log('Request received for insertClass endpoint');
    const className = req.body.className;
    const classDescription = req.body.classDescription;
    const userID = req.body.userID;
  
    connection.query(
      'INSERT INTO classes (className, classDescription, user_id) VALUES (?, ?, ?)',
      [className, classDescription, userID],
      (error, results) => {
        if (error) {
          console.error('Error executing query setting class:', error);
          return res.status(500).json({ error: `Database error: ${error.message}` });
        }
        res.status(200).json({ message: 'Class added successfully.' });
      }
    );
  });
  
  app.delete('/api/deleteAssignmentToClass/:class_id', (req, res) => {
    console.log('Request received for deleteAssignmentToClass endpoint');
    const class_id = req.params.class_id; // Change this line to use req.params
  
    connection.query(
      'DELETE FROM assignments WHERE class_id = ?',
      [class_id],
      (error, results) => {
        if (error) {
          console.error('Error executing query setting class:', error);
          return res.status(500).json({ error: `Database error: ${error.message}` });
        }
        res.status(200).json({ message: 'Class assignments successfully.' });
      }
    );
  });

  app.delete('/api/deleteClass/:class_id', (req, res) => {
    console.log('Request received for delete Class endpoint');
    const class_id = req.body.class_id;
    connection.query(
      'DELETE FROM classes WHERE class_id = ?',
      [class_id],
      (error, results) => {
        if (error) {
          console.error('Error executing query setting class:', error);
          return res.status(500).json({ error: `Database error: ${error.message}` });
        }
        res.status(200).json({ message: 'Class deleted successfully.' });
      }
    );
=======
  // GET -> get the class with the specified class_ID
  app.get('/api/classes/:class_id', (req, res) => {
    const class_id = req.params.class_id;
    connection.query('SELECT * FROM classes WHERE class_id = ?', [class_id], (error, results) => {
      if (error) {
        console.error('Error executing query Classes:', error);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });

app.get('/api/assignments', (req, res) => {
    console.log("Made it past get request")
    connection.query('SELECT * FROM assignments', (error, results) => {
      if (error) {
        console.log("output that there was an error")
        console.error('Error executing query Assignments:', error);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });
  
  app.get('/api/numAssignments/:class_id', (req, res) => {
    console.log('Request received for NumAssignments endpoint');
    const class_id = req.params.class_id; // Change this line to use req.params
    connection.query('SELECT COUNT(*) as assignmentCount FROM assignments WHERE class_id = ?', 
    [class_id],
    (error, results) => {
      if (error) {
        console.error('Error executing query Assignments:', error);
        return res.status(500).json({ error: 'Database error' });
      }
      console.log(results[0].assignmentCount);
      res.json(results[0].assignmentCount);
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

  // POST -> ADD an assignment into assignments table.
  app.post('/api/assignments', (req, res) => {
    const { assignment_id, class_id, description, difficulty, dueDate, user_id } = req.body;
    if (!assignment_id || !class_id || !description || !difficulty || !dueDate || !user_id) {
      return res.status(400).json({ error: 'Invalid request parameters' });
    }
    connection.query('INSERT INTO assignments (assignment_id, class_id, description, difficulty, dueDate, user_id) VALUES (?, ?, ?, ?, ?, ?)', [assignment_id, class_id, description, difficulty, dueDate, user_id], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });


const port = process.env.PORT || 3001;

app.listen(port, ()=>{
  console.log(`Server Listening on port ${port}`);
});
