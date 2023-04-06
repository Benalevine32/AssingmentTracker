const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { json } = require("body-parser");
const app = express();
app.use(express());
app.use(cors());

const connection = mysql.createConnection({
    host: 'assignmenttracker.ci3higxjoes6.us-east-1.rds.amazonaws.com',
    user: 'awsuser',
    password: 'password123!',
    database: 'assignmentTracker', 
    port: 3306
})

app.get('/api/allAssignmentsWithClass', (req, res)=> {
  connection.query('SELECT assignments.*, classes.className as className from assignments join classes on assignments.class_id = classes.class_id', (error, results)=>{
      if(error)
      {
        console.error('Error excecuting query Assignments: ', error);
        return res.status(500).json({error: 'Database error'});
      }
      res.json(results);
  })
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

app.get('/api/users', (req, res)=> {
  connection.query('SELECT * from users ', (error, results)=>{
      if(error)
      {
        console.error('Error excecuting query Assignments: ', error);
        return res.status(500).json({error: 'Database error'});
      }
      res.json(results);
  })
})

app.get('/api/insertAssignment/:pAssignmentName/:pSelectedClass/:pEstimatedTime/:pDueDate/:pDifficulty', (req,res)=>{
  console.log('posting..');

  assignmentName = req.params.pAssignmentName;
  selectedClass = req.params.pSelectedClass;
  estimatedTime = req.params.pEstimatedTime;
  dueDate = req.params.pDueDate;
  diff = req.params.pDifficulty;
  

  connection.query(`INSERT INTO assignments (class_id, description, difficulty, dueDate, estimatedTime) VALUES ("${selectedClass}","${assignmentName}", "${diff}", "${dueDate}", "${estimatedTime}")`,(error, res)=>{
    if(error){
      console.error('Error exececuting query: ', error);
      return res.status(500).json({error: 'Database error'});
    }
    console.log('Assignments added successfully');

  });
  
})



