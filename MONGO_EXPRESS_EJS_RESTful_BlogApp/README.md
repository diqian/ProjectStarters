## How to run
Front end, this will start express app from app.js
```
nodemon app.js  // node app.js (also work)
```
Backend, start the mongo server (make sure open a new terminal to do that)
```
mongod
```
To test you database, open mongo shell
```
mongo
```
## How it work
This is an express app with mongoose to interact with mongo database. It also use ejs as template engine and use semantic UI as our CSS library. Express


## File Structure
```
.
|____app.js               (where to start the express app, routing is also here)
|____package.json
|____public               (file need to be served staticly)
| |____stylesheets  
| | |____app.css          (included in header.ejs)
|____README.md
|____views
| |____edit.ejs
| |____index.ejs
| |____new.ejs
| |____show.ejs
| |____partials           (ejs partial, included in every file)
| | |____footer.ejs
| | |____header.ejs       (includes app.ejs and semantic UI lib)

```


## Notes on Testing
Whenever you create a new route, you should test it with POSTMAN. See the route is working.



## RESTFUL (A simple tutorial)
```
name        url             verb        desc
========================================================================
INDEX       /dogs           GET         Display a list of all dog
NEW         /dogs/new       GET         Display form to make a new dog
CREATE      /dogs           POST        Create a new dog, then redirect somewhere
SHOW        /dogs/:id       GET         Show info about one dog
Edit        /dogs/:id/edit  GET         Show edit form for one dog
Update      /dogs/:id       PUT         Update a particular dog, then redirect somewhere
Destory     /dogs/:id       DELETE      Delete a particular dog, then redirect somewhere

```

## Notes On Sanitiazing Content when create
```

var expressSanitizer = require("express-sanitizer");
app.use(expressSanitizer());


//CREATE Route
app.post("/blogs", function(req, res){
    
    //sanitize input
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
```


## Notes On post request
As you can see, we can group all the title, iage, body together
by using blog[title]. Now once the button is cliked, everything will be inside blog.
And can be referenced as req.body.blog

In new.ejs
```
<% include ./partials/header %>

<div class="ui main container segment">
    <div class="ui huge header">New Blog</div>
    <form class="ui form" action="/blogs" method="POST">
        <div class="field">
            <label>Title</label>
            <input type="text" name="blog[title]" placeholder="title">
        </div>
        <div class="field">
            <label>Image</label>
            <input type="text" name="blog[image]" placeholder="image">
        </div>
        <div class="field">
            <label>Blog Content</label>
            <textarea name="blog[body]"></textarea>
        </div>
        <input class="ui violet big basic button" type="submit">
    </form>
</div>

<% include ./partials/footer %>
```

In app.js
```
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
```

## Notes on put request （same with put request）

HTML don't support put request!! They only support get and post request. 
Thus, we have to use a wordaround called: method-override. Method override is a package we install and tell express to use it. Thus, we use method as POST, but add ```?_method=PUT``` at the end of the action. And method-overrride will try to find the query string and treat it as a PUT request.
```
<% include ./partials/header %>

<div class="ui main container segment">
    <div class="ui huge header">Edit <%=blog.title%></div>
    <form class="ui form" action="/blogs/<%=blog._id%>?_method=PUT" method="POST">
        <div class="field">
            <label>Title</label>
            <input type="text" name="blog[title]" value="<%=blog.title%>">
        </div>
        <div class="field">
            <label>Image</label>
            <input type="text" name="blog[image]" value="<%=blog.image%>">
        </div>
        <div class="field">
            <label>Blog Content</label>
            <textarea name="blog[body]"><%=blog.body%></textarea>
        </div>
        <input class="ui violet big basic button" type="submit">
    </form>
</div>

<% include ./partials/footer %>

```
Method override is a package we install and tell express to use it.

```javascript
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

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
```



## Mongo (A simple tutorial)
 
Start mongo server, and leave it running, (always open a new terminal to do this task).
We have to this if want to be able to use mongo at all.
```
mongod
```
Test mongo when mongodemon is running in the background.
The following cammand open up the mongo shell, we test and debug in here
```
//in terminal

mongo

//one mongo shell in opened //we do
> help
    ...(allow you see all the command)
> show dbs
admin
local
> use demo     
switch to db demo
> db.dogs.insert({name: "Rusty", breed: "Mutt"})
(inserting value to dogs collection)
> show collections
dogs
system.indexe
> db.dogs.find()
{"_id": ..., "name": "Rusty"}
> db.dogs.update({name: "Lulu"}, {$set: {name: "Tater", breed: "Labradoodle"}})
>
> db.dogs.remove({breed: "Labradoodle"})
Write Result({breed: "Labradoole"})
```






## Mongoose (A simple tutorial)
A tool help us interact with mongoDB inside javascript files. 

Now, create a cat.js file, and put it in somefolder and do the following inside that folder

1. First, install mongoose
```
npm install mongoose --save
```
```javascript
//require mongoose
var mongoose = require("mongoose");
//connect to database
//if cat_app deosn't exist, it will create one for you
mongoose.connect("mongodb://localhost/cat_app");

// define the pattern, the schema, and tell mongodb, when we add a cat, it look like this
var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String 
});

//take the schema, and compile into a model
//with this model, it will contain all the methods
// we can do Cat.find, Cat.update and many more
var Cat = mongoose.model("Cat", catSchema);

// TO create a cat

var george = new Cat({
    name: "Geoge",
    age: 11,
    temperament: "Grouchy"
});

//save data to the database
george.save(function(err, cat){
   if(err){
    console.log("something went wrong");
   } else {
    console.log("add cat to the dabase.")
    console.log(cat);
   }
});

//Another way to create a cat in cat.js (better)

Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(err, cat){
    if(err){
        console.log(err);
    }else{
        console.log(cat);
    }
})

//retreive all cat from the DB 

Cat.find({}, function(err, cats){
    if(err){
        console.log("Oh no, eror");
        console.log(err);
    } else {
        
    }
});


```
GO to mongo shell see if it worked
```
> mongo
> show dbs
cat_app
> use cat_app
switched to db cat_app
> show collections
cats
> db.cats.find()
{"_id": "..", "name": "George"}
```



Notes from: "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/t/lecture/3919762?start=0"