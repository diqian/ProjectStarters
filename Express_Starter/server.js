var express = require('express'); 

// Create our app
var app = express();

//tell express which folder we want to serve
//express.static will specify a folder name that we expose to the web server
app.use(express.static('public')); 

app.listen(3000, function(){
    console.log('Express Server is up on port 3000');
});