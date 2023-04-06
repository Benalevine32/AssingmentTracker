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

// GET -> get all classes
app.get('/api/classes', (req, res) => {
    connection.query('SELECT * FROM classes', (error, results) => {
      if (error) {
        console.error('Error executing query Classes:', error);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });

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

  // GET -> selects all assignments but only the top 3
  app.get('/api/assignments', (req, res) => {
    console.log("Made it past get request")
    console.log("You just used assignments");
    connection.query('SELECT * FROM assignments LIMIT 3', (error, results) => {
      if (error) {
        console.log("output that there was an error")
        console.error('Error executing query Assignments:', error);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });

  // GET -> get the 3 most pressing assignments by dueDate
  app.get('/api/top3AssignmentsByDate', (req, res) => {
    // the SQL query
    console.log("You just used top3AssignmentsByDate");
    connection.query('SELECT * FROM assignments ORDER BY dueDate ASC LIMIT 3', (error, results) => {
      if (error) {
        console.log("output that there was an error")
        console.error('Error executing query top 3 Assignments by dueDate:', error);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    })
  });

  // GET -> get the 3 most pressing assignments by difficulty
  app.get('/api/top3AssignmentsByDifficulty', (req, res) => {
    // the SQL query
    console.log("You just used top3AssignmentsByDifficulty");
    connection.query('SELECT * FROM assignments ORDER BY difficulty ASC LIMIT 3', (error, results) => {
      if (error) {
        console.log("output that there was an error")
        console.error('Error executing query top 3 Assignments by difficulty:', error);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    })
  });

  // GET -> get the 3 most pressing assignments based on the class
  app.get('/api/top3AssignmentsByDifficulty/:classId', (req, res) => {
    const classId = req.params.classId;
    console.log("You just used top3AssignmentsByDifficulty with classId:", classId);
    connection.query('SELECT * FROM assignments WHERE class_id = ? ORDER BY difficulty ASC LIMIT 3', [classId], (error, results) => {
      if (error) {
        console.error('Error executing query top 3 Assignments by difficulty:', error);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });
  
  // app.get('/api/top3Assignments', (req, res) => {
  //   connection.query('SELECT * FROM assignments ORDER BY difficulty DESC LIMIT 3', (error, results) => {
  //     if (error) {
  //       console.error('Error executing query Assignments:', error);
  //       return res.status(500).json({ error: 'Database error' });
  //     }
  //     res.json(results);
  //   });
  // });

  // // POST -> ADD an assignment into assignments table.
  // app.post('/api/assignments', (req, res) => {
  //   const { assignment_id, class_id, description, difficulty, dueDate, user_id } = req.body;
  //   if (!assignment_id || !class_id || !description || !difficulty || !dueDate || !user_id) {
  //     return res.status(400).json({ error: 'Invalid request parameters' });
  //   }
  //   connection.query('INSERT INTO assignments (assignment_id, class_id, description, difficulty, dueDate, user_id) VALUES (?, ?, ?, ?, ?, ?)', [assignment_id, class_id, description, difficulty, dueDate, user_id], (error, results) => {
  //     if (error) {
  //       console.error('Error executing query:', error);
  //       return res.status(500).json({ error: 'Database error' });
  //     }
  //     res.json(results);
  //   });
  // });

  app.post('/api/assignments', (req, res) => {
    const { assignmentName, className, estimatedTime, dueDate, difficulty } = req.body;
    console.log(formData); // this will print the form data to the console
  
    // SQL query to insert the new assignment
    const query = "INSERT INTO assignments (name, description, deadline, difficulty) VALUES (?, ?, ?, ?)";

    connection.query(query, [assignmentName, className, dueDate, difficulty], (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error adding assignment to database');
      } else {
        res.status(200).send('Assignment added to database');
      }
    });
});


const port = process.env.PORT || 3001;

app.listen(port, ()=>{
  console.log(`Server Listening on port ${port}`);
});
