var express = require('express');
var path = require('path');
var app = express();
/*
 Note that the root route is now set to your public dir, 
 so all static files you load will be considering public as root.
 Now, instead of <script src="./dist/bundle.js" />
 You only neeed to write  <script src="bundle.js" />, if bundle.js is 
 directly under dist
 
 https://www.tutorialspoint.com/expressjs/expressjs_static_files.htm
*/
app.use(express.static('./dist'));

app.use('/', function (req, res) {
    res.sendFile(path.resolve('client/index.html'));
});

var port = 3000;

app.listen(port, function(error) {
  if (error) throw error;
  console.log("Express server listening on port", port);
});
