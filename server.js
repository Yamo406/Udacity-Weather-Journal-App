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

app.get('/', getHomepage)

function getHomepage(req, res) {
    console.log("GET is running on the homepage");
    res.send("GET is running on the homepage");
}

app.post('/', postHomepage)

function postHomepage(req, res) {
    console.log("POST is running on the homepage");
    res.send("POST is running on the homepage");
}


// Initialize all route with a callback function
app.get('/all', getProjectData);

app.post('/add', postProjectData);

// Callback function to complete GET '/all'
function getProjectData(req, res) {
    console.log("Received GET request on \'\/all\' route.");
    res.send(projectData);
}

// Post Route
function postProjectData(req, res) {
    console.log("Received POST request on '/add' route.")
    console.log("Request Body: ", req.body)

    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.feel = req.body.feel;

    console.log("Updated Project Data: ", projectData)
    res.status(200).json(projectData)
}