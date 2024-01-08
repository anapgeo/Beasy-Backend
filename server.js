const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const pool = mysql.createPool({
  host: 'localhost',     
  user: 'root',  
  password: 'root',  
  database: 'beazydb',  
  connectionLimit: 10    
});


// Define a route that executes a query
app.get('/users', (req, res) => {
    const sqlQuery = 'SELECT * FROM user';
  
    // Execute the query
    pool.query(sqlQuery, (error, results, fields) => {
      if (error) {
        console.error('Error executing query:', error.message);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Process the query results
      res.json(results);

    });
  });

  // Define a route that executes a query
app.get('/teams', (req, res) => {
  const sqlQuery = 'SELECT * FROM team';

  // Execute the query
  pool.query(sqlQuery, (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error.message);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Process the query results
    res.json(results);

  });
});

  // Define a route that executes a query
app.get('/available-services', (req, res) => {
  const sqlQuery = `SELECT team.name,service.title
  FROM team JOIN provides_service ON team.team_TIN = provides_service.team_team_TIN
  JOIN service ON provides_service.service_service_ID = service.service_ID;
  `;

  // Execute the query
  pool.query(sqlQuery, (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error.message);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Process the query results
    res.json(results);

  });
});
  
  app.get('/appointments', (req, res) => {
    const sqlQuery = 'SELECT * FROM appointment;';
  
    // Execute the query
    pool.query(sqlQuery, (error, results, fields) => {
      if (error) {
        console.error('Error executing query:', error.message);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Process the query results
      res.json(results);

    });
  });

  // Define the POST endpoint for inserting a new user
  app.post('/users', (req, res) => {
    let columns, values;
    console.log(req.body)
    if (req.body) {
      columns = Object.keys(req.body).join(', ');
      values = Object.values(req.body).map(value => typeof value === 'string' ? `'${value}'` : value).join(', ');
    } else {
      console.log('Request body is undefined or null');
      res.status(400).json({ message: 'Invalid request. Request body is required.' });
      return;
    }
  
    const sqlQuery = `
      INSERT INTO user (${columns})
      VALUES (${values})
    `;
  
    pool.query(sqlQuery, (error, results, fields) => {
      if (error) {
        console.error('Error executing query:', error.message);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Send a success response
      res.status(201).json({ message: 'User created successfully' });
    });
  });
  
  app.post('/appointments', (req, res) => {
    let columns, values;
    console.log(req.body)
    if (req.body) {
      columns = Object.keys(req.body).join(', ');
      values = Object.values(req.body).map(value => typeof value === 'string' ? `'${value}'` : value).join(', ');
      console.log(columns)
      console.log(values)
    } else {
      console.log('Request body is undefined or null');
      res.status(400).json({ message: 'Invalid request. Request body is required.' });
      return;
    }
  
    const sqlQuery = `
      INSERT INTO appointment (${columns})
      VALUES (${values})
    `;
    console.log(sqlQuery)
    pool.query(sqlQuery, (error, results, fields) => {
      if (error) {
        console.error('Error executing query:', error.message);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Send a success response
      res.status(201).json({ message: 'User created successfully' });
    });
  });

app.get('/new', (req, res) => {
    const sqlQuery = 'SELECT team.name,service.title FROM team JOIN provides_service ON team.team_TIN = provides_service.team_team_TIN JOIN service ON provides_service.service_service_ID = service.service_ID;'
  
    // Execute the query
    pool.query(sqlQuery, (error, results, fields) => {
      if (error) {
        console.error('Error executing query:', error.message);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Process the query results
      res.json(results);
        
    });
  });

  // app.get('/appointments', (req, res) => {
  //   const { search } = req.query;
  //   const sqlQuery = ''

  //   // Respond with the filtered appointments
  //   res.json(filteredAppointments);
  // });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
