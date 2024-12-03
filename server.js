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
    // Callback to debug
    console.log(`server running on ${port}`);
});

app.route('/')
    .get(getHomepage)
    .post(postHomepage)

function getHomepage(req, res) {
    res.send("GET is running on the homepage");
    console.log("GET is running on the homepage");
}
function postHomepage(req, res) {
    res.send("POST is running on the homepage");
    console.log("POST is running on the homepage");
}


// Initialize all route with a callback function
app.route('/all')
    .get(getProjectData)
    .post(postProjectData)
    ;

// Callback function to complete GET '/all'
function getProjectData(req, res) {
    console.log("Received GET request on \'\/all\'");
    res.send(projectData);
}

// Post Route
function postProjectData(req, res) {
    console.log("Received POST request on \'\/all\'")
    let reqBody = req.body;
    projectData.temperature = reqBody.temperature;
    projectData.date = reqBody.date;
    projectData.userResponse = reqBody.userResponse;
    res.send(projectData);
}