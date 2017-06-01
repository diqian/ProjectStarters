


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