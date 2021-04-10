// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;

// Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};

// Initialize all route with a callback function
app.get('/getWeather', sendData);

// Callback function to complete GET '/getWeather'
function sendData (req, res) {
    res.send(projectData);
    projectData = {};
}

// Post Route
app.post('/addWeather', addData );

// Function That Adds Data To ProjectData Object & Send Successful POST.
function addData (req, res) {
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        feelings: req.body.content,
    }
    res.send({status: 'success'})
}