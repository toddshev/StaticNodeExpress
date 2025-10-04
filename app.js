const express = require("express");
const bodyParser = require("body-parser");
//Data file for all info on the site.
const data = require("./data.json");
const {projects} = data;
const path = require("path");

const app = express();
//Middleware and config
app.use(bodyParser.urlencoded({extended: false}));
//Set up express to work with pug templates
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//Serve static assets such as css, and images in public directory
app.use("/static", express.static("public"));

//Routes--------------------------------
//Index / Root / Landing Page
app.get("/", (req,res) =>{
    res.render("index", {projects});
});

//Info about me
app.get("/about", (req, res) =>{
    res.render("about");
});

//Parameterized route for chosen project using ID to determine which to display
app.get("/project/:id", (req, res) =>{
    const projId = req.params.id;
    const project = projects.find( ({id}) => id === parseInt(projId));
    res.render("project", {project});
});

//404 error handler - placed at the bottom so all other routes are checked first
app.use( (req, res, next) => {
    const err = new Error("This is not the page you are looking for");
    err.status = 404;
    console.log(err);
    res.render("page-not-found", {err});
});

// Global error handler - checks for any server-related errors
//If error info is passed, display, otherwise provide generic server error messaging
app.use( (err, req, res, next) =>{
  if(err.message && err.status){
    console.log(err);
    res.render("error", {err});
  }else {
    err.message = "Sorry, there is a server issue";
    err.status = 500;
    console.log(err);
    res.render("error", {err});
  }
});

//Spin up server - can be done multiple ways, node, npm, nodemon, etc.
app.listen(3000,() =>{
    console.log("app is running on port 3000");
});