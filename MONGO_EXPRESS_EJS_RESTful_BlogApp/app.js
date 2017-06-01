var express     = require("express"),
    app         = express(),
    // when we create blog, we want to input html tag that can be rendered
    // but we don't want people to put evil scirpt inside to destruct our code
    // thus, this makes sure the content is safe. (remove all the script)
    expressSanitizer = require("express-sanitizer"),
    // HTML doesn't support put request, thus we have to make it a post request
    // and add a query string at the end "?_method=put
    methodOverride = require("method-override"),
    // we don't have a req.body field, by having bodyParser installed,
    //we have req.body coming back as a json object
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
// _method: this could be anything, it's just telling methodOVerride what to look for
// now we told express app, when you see a _method, take whatever it equal to, and treat that request as
// the reqeust you wanted "eg; _method=PUT", now express treate it as a put request
app.use(methodOverride("_method"));
//this line has to be below bodyparser
app.use(expressSanitizer());

//MONGOOSE / MODEL  CONFIG
var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});
//create model
var Blog = mongoose.model("Blog", blogSchema);
//once you just started, you are recommanded to just create a blog post 
//so that you have something in the database

//RESTFUL ROUTES

//It's conventional for the root page to redirect to the index page
app.get("/", function(req, res){
    res.redirect("/blogs"); 
});

//INDEX--list of all blog
app.get("/blogs", function(req, res){
    
    //retreive all blog from the database and display
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index", {blogs: blogs});    
        }
    });
});
//NEW Route
app.get("/blogs/new", function(req, res){
    res.render("new");
});

//CREATE Route
app.post("/blogs", function(req, res){
    
    req.body.blog.body = req.sanitize(req.body.blog.body);
    //create a new blog
    // Blog.create(data, callback);
    //notice, there is a trick here!!!
    //in form, we wrote name="body["title"]"
    //and req.body.blog will automatically create an object with title field!!
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        }else{
            //redriect to index page
            res.redirect("/blogs");
        }
    });
});

//SHOW Route
app.get("/blogs/:id", function(req, res){
    //grab the correct id
    //Blog.findById(Id, callback)
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show", {blog: foundBlog});    
        } 
    });
});
//EDIT route
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       }else{
           res.render("edit", {blog: foundBlog});
       }
    });
});

//Update route
app.put("/blogs/:id", function(req, res){
    
    req.body.blog.body = req.sanitize(req.body.blog.body);
//   Blog.findByIdAndUpdate(id, newData, callback)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if(err){
           res.redirect("/blogs");
       }else{
           res.redirect("/blogs/"+req.params.id);
       } 
    });
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
   //destroy blog
   Blog.findByIdAndRemove(req.params.id, function(err){
       //it's just good practice to check for error
       if(err){
           res.redirect("/blogs");
       }else{
           //redriect somewhere else
           res.redirect("/blogs");
       }
   });
   
});


app.listen(3000, function(){
    console.log("Server is running on 3000"); 
});