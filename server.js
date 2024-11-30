// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Express to run server and routes
import express from "express";

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
import cors from "cors";

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Spin up the server
const port = 9000;

const server = app.listen(port, () => {
    console.log(`server running on ${port}`);
})

// Callback to debug
app.route('/')
    .get((req, res) => {
        res.send("GET is running on the homepage");
    })
    .post((req, res) => {
        res.send("POST is running on the homepage");
    })
// Initialize all route with a callback function
app.get('/all', (req, res) => {

})

// Callback function to complete GET '/all'

// Post Route
