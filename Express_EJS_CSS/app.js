/************************************************/
/*********** Set up the app       ***************/
/************************************************/
var express = require('express'); 
// Create our app
var app = express();
//bodyParser allow you to user req.body syntax, and return you a JSON object
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
// once we served public directory, other files can
// reference files in public directory, and can omit pulbic prefix
app.use(express.static("public"));

// by setting view engine, express will know
// you are rendering ejs files
// so you don't need to write res.render("home.ejs") anymore, instead
// just write res.render("home")
app.set("view engine", "ejs");

/************************************************/
/***********  Some temp data      ***************/
/************************************************/

var friends = ["Tony", "Eric", "Lily"];
/************************************************/
/***********  Routing      **********************/
/************************************************/

/* Set up home route*/ 
app.get("/", function(req, res){
    // use render to send a file, give a name of a file
    res.render("home.ejs");
});

/* This route show you how to pass variable */
/* try   http://localhost:3000/fallinlovewith/rusty   in browser*/
app.get("/fallinlovewith/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love.ejs", {thingVar: thing});
});

/* Demonstrate how to pass multiple param, and work with the post route below*/
app.get("/friends", function(req, res){
    var posts = [
        {title: "lala"},
        {title: "mama"},
        {title: "tata"},
        {title: "qula"},
    ];
    res.render("friends.ejs", {posts: posts, friends, friends})
});

/* Make a sinple post route */
app.post("/addfriend", function(req, res){
    console.log(req.body);
    var newfriend = req.body.newfriend;
    friends.push(newfriend);
    console.log("You have reached post route");
    res.redirect("/friends");
});

/* This route show you instead of render a page, you can also send a message back */
app.get("/test", function(req, res){
    // use send to send back some message
    res.send("<h1>Welcome to the home page!</h1>");
});

/************************************************/
/***********  Listen on port     ****************/
/************************************************/
app.listen(3000, function(){
    console.log('Express Server is up on port 3000');
}); 