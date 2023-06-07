//endpoint for all routes
let myProjectData = {};

// express to run server and routes
const express = require("express");
// cors for cross origin 
const cors = require("cors");

//  body-parser to parse data from server side
const bodyParser = require("body-parser");

//=====

// instantiate an instance of app
const app = express();

// using cross origin allowance
app.use(cors());

// Port Channel
const port = 8000;

/* Middleware*/
// configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// initialize the main  folder

app.use(express.static("website"));

// Setup Server
app.listen(port, listening );

function listening (){
  console.log("Server is now running on port " + port)
}
// Setting up route for sending data with their new objects to the client side
app.get("/getData", (req ,res) => {
  res.send(myProjectData);
});


// Setting up route for recieving storing data into  myProjectData object from client side
app.post("/postData", (req, res) => {
  myProjectData = { ...req.body };
  res.send();
});
