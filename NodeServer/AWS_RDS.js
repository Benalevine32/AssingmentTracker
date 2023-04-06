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

//For signup
app.get('/api/register/:firstName/:lastName/:email/:password', async (req, res) => {
  const {firstName, lastName, email, password} = req.params
  var userExists
  console.log(firstName, lastName, email, password)
  const query = `SELECT * FROM users WHERE email="${email}"`
  connection.query(query, (error, results) => {
    if (error) { 
      console.error('Error getting assignments: ', error)
      return res.status(500).json({
        error: 'db error'
      });
    }
    res.json(results)
    userExists = results.length

    if(userExists == 0){
      const addUserQuery = `INSERT INTO users (firstName, lastName, email, password)
      SELECT "${firstName}", "${lastName}", "${email}", "${password}" FROM DUAL
      WHERE NOT EXISTS (SELECT * FROM users
          WHERE firstName = "${firstName}" AND lastName = "${lastName}" AND email = "${email}" AND password = "${password}" LIMIT 1);
      `
      connection.query(addUserQuery, (error, newResults) => {
        if (error) {
          console.error('Error executing query Classes:', error);
          return results.status(500).json({ error: 'Database error' });
        }
      })
    }
    else{
    
    }
  })
}),

// For login
app.get('/api/login/:email/:password', async (req, res) => {

  
  email = req.params.email;
  password = req.params.password;

  console.log(email, password)
  connection.query('SELECT * FROM users WHERE email="'+ email +'" AND password="'+ password +'"', (error, results) => {
    if (error){
      console.error('error with log in', error);
      return res.status(500).json({error: 'db error'});
    }

    res.json(results)
  });
});



// For assignment editor popup
app.get('/api/edit/:assId/:diff/:desc/:due', async (req, res) =>{
  const { diff, assId, desc, due } = req.params
  connection.query('UPDATE assignments SET difficulty = '+ diff +', description = "'+ desc +'", dueDate = "'+ due +'" WHERE assignment_id = ' + assId, (error, results) => {
    if (error) {
      console.error('Error executing query Classes:', error);
      return results.status(500).json({ error: 'Database error' });
    }
  });
});

app.get('/api/edit/assignments/:userId', (req, res) => {
  const { userId } = req.params
  const query = `SELECT * FROM assignments WHERE user_id="${userId}"`
  connection.query(query, (error, results) => {
    if (error) { 
      console.error('Error getting assignments: ', error);
      return res.status(500).json({
        error: 'db error'
      });
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