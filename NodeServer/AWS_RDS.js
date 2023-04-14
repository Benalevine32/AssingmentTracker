const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { json } = require("body-parser");
const app = express();
app.use(express());
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'assignmenttracker.ci3higxjoes6.us-east-1.rds.amazonaws.com',
  user: 'awsuser',
  password: 'password123!',
  database: 'assignmentTracker',
  port: 3306
})



app.get('/api/allAssignmentsWithClass', (req, res) => {
  connection.query('SELECT assignments.*, classes.className as className from assignments join classes on assignments.class_id = classes.class_id', (error, results) => {
    if (error) {
      console.error('Error excecuting query Assignments: ', error);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  })
});


//For signup
app.get('/api/register/:firstName/:lastName/:email/:password', async (req, res) => {
  const { firstName, lastName, email, password } = req.params
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

    if (userExists == 0) {
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
    else {

    }
  })
}),

  // For login
  app.get('/api/login/:email/:password', async (req, res) => {


    email = req.params.email;
    password = req.params.password;

    console.log(email, password)
    connection.query('SELECT * FROM users WHERE email="' + email + '" AND password="' + password + '"', (error, results) => {
      if (error) {
        console.error('error with log in', error);
        return res.status(500).json({ error: 'db error' });
      }

      res.json(results)
    });
  });



// For assignment editor popup
app.get('/api/edit/:assId/:diff/:desc/:due', async (req, res) => {
  const { diff, assId, desc, due } = req.params
  connection.query('UPDATE assignments SET difficulty = ' + diff + ', description = "' + desc + '", dueDate = "' + due + '" WHERE assignment_id = ' + assId, (error, results) => {
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
});



app.get('/api/classes', (req, res) => {
  const userId = req.query.userID;
  connection.query('SELECT * FROM classes where user_id = ?',[userId], (error, results) => {
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
      app.get('/api/classes', (req, res) => {
        connection.query('SELECT * FROM classes', (error, results) => {
          if (error) {
            console.error('Error executing query Classes:', error);
            return res.status(500).json({ error: 'Database error' });
          }
          res.json(results);
        });
      });
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
    },
    res.status(200).json({ message: 'Class added successfully.' })
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
  const UserId = req.query.userID;
  connection.query('SELECT * FROM assignments where user_id = ? ORDER BY difficulty DESC LIMIT 3', [UserId], (error, results) => {
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


app.get('/api/users', (req, res) => {
  connection.query('SELECT * from users ', (error, results) => {
    if (error) {
      console.error('Error excecuting query Assignments: ', error);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
})


app.get('/api/insertAssignment/:pAssignmentName/:pSelectedClass/:pEstimatedTime/:pDueDate/:pDifficulty/:pUserID', (req, res) => {
  console.log('posting..');

  const assignmentName = req.params.pAssignmentName;
  const selectedClass = req.params.pSelectedClass;
  const estimatedTime = req.params.pEstimatedTime;
  const dueDate = req.params.pDueDate;
  const diff = req.params.pDifficulty;
   UserID = req.params.pUserID;


  connection.query(`INSERT INTO assignments (class_id, description, difficulty, dueDate, estimatedTime, user_id) VALUES ("${selectedClass}","${assignmentName}", "${diff}", "${dueDate}", "${estimatedTime}", "${UserID}")`, (error, res) => {
    if (error) {
      console.error('Error exececuting query: ', error);
      return res.status(500).json({ error: 'Database error' });
    }
    console.log('Assignments added successfully');
  });
});
