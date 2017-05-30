# How to open
> node server.js   
---
## How it work?
> in terminal, type ```node server.js```, then, node will run server.js, and start the express app. In express app, it serves the public folder, and render index.html as root page.
>
> go to localhost:3000 to see the app
>

## File Structure
```
.
|____package.json
|____public                         (public folder is used to serve static files)
| |____index.html                   (root page to display)
|____README.md
|____server.js                      (express app start here)
```
---

In  server.js
```
var express = require('express'); 

// Create our app
var app = express();

//tell express which folder we want to serve
//express.static will specify a folder name that we expose to the web server
app.use(express.static('public')); 

app.listen(3000, function(){
    console.log('Express Server is up on port 3000');
});
```