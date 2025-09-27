const express = require("express");
const bodyParser = require("body-parser");
const data = require("./data.json");
const {projects} = data;
const path = require("path");

const app = express();
//app.use(express.urlencoded());
//middleware/config
app.use(bodyParser.urlencoded({extended: false}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use("/static", express.static("public"));

//routes
app.get("/", (req,res) =>{
    res.render("index", {projects});
});

app.get("/about", (req, res) =>{
    res.render("about");
});

app.get("/project/:id", (req, res) =>{
    const projId = req.params.id;
    const project = projects.find( ({id}) => id === parseInt(projId));
    res.render("project", {project});
});


app.use( (req, res, next) => {
    const err = new Error("This is not the page you are looking for");
    err.status = 404;
    err.message = "Sorry, cannot find the page";
    console.log(err);
    next(err);
    //res.render("error-page-404", {err});
});

// error handler
app.use( (err, req, res, next) =>{
  // set locals, only providing error in development
  if(err.message && err.status){
    console.log(err);

    //res.render("error-page-global", {err});
  } //else {
   // err.message = "Something went wrong.  Sorry.";
   // err.status = 500;
   // console.log(err);

   // res.render("error-page-global", {err});
  //}
});

app.listen(3000,() =>{
    console.log("app is running on port 3000");
});