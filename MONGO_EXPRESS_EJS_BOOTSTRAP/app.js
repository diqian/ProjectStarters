/************************************************/
/*********** Set up the app       ***************/
/************************************************/
var express = require('express'); 
// `Create` our app
var app = express();
//bodyParser allow you to use req.body syntax, and return you a JSON object
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
// once we served public directory, other files can
// reference files in public directory, and can omit pulbic prefix
app.use(express.static("public"));


var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");


/************************************************/
/***********  Schema setup      **********************/
/************************************************/
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create(
//     {name: "ca",
//      image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
//      description: "blablnalnanlanalnalna"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         }else {
//             console.log("Newly created campground");
//             console.log(campground);
//         }
//     }
// )


// by setting view engine, express will know
// you are rendering ejs files
// so you don't need to write res.render("home.ejs") anymore, instead
// just write res.render("home")
app.set("view engine", "ejs");

/************************************************/
/***********  Routing      **********************/
/************************************************/

/* Set up home route*/ 
app.get("/", function(req, res){
    // use render to send a file, give a name of a file
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index", {campgrounds: campgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    // CREATE A NEW campground and save to DB
    Campground.create(newCampground, function(err, newCreated){
        if(err){
            console.log(err);
        }else{
            console.log("newly created");
            res.redirect("/campgrounds");
        }
    });
});


app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res){
    //find campground with correct id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("show", {campground: foundCampground});
        }
    })
});

/************************************************/
/***********  Listen on port     ****************/
/************************************************/
app.listen(3000, function(){
    console.log('Express Server is up on port 3000');
}); 