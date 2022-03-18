/* 
 * !!! This code was written, tested, debugged, and operated by me only Muhammad Nasif, all rights reserved only to me and Udacity.
 *  Everything done in the code has its own comment above it.
*/

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Cors for cross origin allowance
const cors = require('cors');

//Enable Cors Requests
app.use(cors());

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server.
const port = 3030; 
const hostName = 'localHost';

//Spin up the server 
const server = app.listen(port,() => {
    console.log(`Server is running on ${hostName}: ${port}`);
})

// Setup empty JS object to act as endpoint for all routes
  projectData = {};


// GET route  that returns the projectData
  app.get('/allData', (request, response)=>{
      console.log("get")
      console.log(projectData);
      response.send(projectData);
  });

// POST route that adds incoming data to projectData
  app.post('/clientAddedData' ,(request, response)=>{
    projectData = request.body
    console.log("Post")
    console.log(projectData);
    response.send(projectData);
  });


