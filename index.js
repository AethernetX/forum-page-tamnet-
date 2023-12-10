//import modules
var express = require("express");
var ejs = require("ejs");
var bodyparser = require("body-parser");
var mysql = require("mysql");

//create express application object
const app = express();
const port = 8000;
app.use(bodyparser.urlencoded({extended: true}));

//define database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'tamAdmin',
    password: 'tam2424',
    database: 'tamnet'
});

//error checking
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("database connected!");
});

global.db = db;

//link stylesheet
app.use(express.static(__dirname + "/public"));

//set directories for ejs files
app.set("views", __dirname + "/views");

//set ejs as templating engine
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);

//define some data about the site
//site will know which user is on using username
var siteData = {
    siteName: "Tamnet",
};

//Require main.js module
require("./routes/main")(app, siteData);

// Start the web app listening
app.listen(port, () => console.log("App listening on port 8000"));