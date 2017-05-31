## How to run
### How to run -- method 1
> Without hot reloading, and you want to save a lot work, you have to do 2 step
>
> 1. (open a terminal), type ```webpack -w```, which generate the bundle.js you need, notice, although nodemon is monitoring any change, it won't rebuild bundle.js for you. Webpack -w will monitor any change from your entry files and its dependencies, thus, making rebuilding bundle.js possible.
>
> 2. (open another terminal) type ```npm run serve```, it will invoke the script in package.json ```nodemon server/server.js```. Nodemon monitors your server code, any time the server code changes, it restarts your server. (type ```which nodemon``` to see if you have nodemon installed).
>
> 3. Refreash the browser the see changes. (go to localhost:3000)
>
> Takeaway: make sure to open 2 terminals, one for webpack rebuilding auto rebuilding bundle.js for you, the other for nodemon to restart your server whenever you made change to server code
---
### How to run -- solution 2 (not as good as solution 1)
> Without hot reloading, you have to do 2 step
> 1. webpack --config webpack.config.js, which generate the bundle.js you need, notice, although nodemon is monitoring any change, but bundle.js won't be rebuilt if any change was made inside compoents. That's why we need to genereate bundle.js everytime manually by hand with this method.
>
> 2. npm run serve, it will invoke the script in package.json ```nodemon server/server.js```. Nodemon monitors your server code, any time the server code changes, it restarts your server. (type ```which nodemon``` to see if you have nodemon installed).
>
> (other way to start the server) node server/serve.js
>
> This command will start the express app. (Bad part: whenever you make change to serve code, the change it not updated. Thus, you have to exit, and restart the server again)

## How it work?
We will have express server, running in server/server.js. It will serve the dist folder as static files. client/index.html will include dist/bundle.js, and be rendered as root page. Also, index.html will have the anchor for react to bind to. Thus, we use client.js to connect App.js with the anchor, and App.js will have reference to all the other files, and client.js will be the entry point for webpack to create bundle.js.

## File Structure
```
.
|____dist               (generate by webpack, and served by express and static folder)
| |____bundle.js       
|____client
| |____client.js        (reference to app.js, entry point for webpack)
| |____index.html       (has id="app" for react to mount to, include bundle.js)
|____components
| |____App.js           (reference to all other components)
|____package.json
|____README.md
|____server
| |____server.js        (express server, server static file from dist folder, listen on 3000)      
|____webpack.config.js

```
## STEP BY STEP SET UP
```
npm i babel-core babel-loader --save-dev
npm i babel-preset-es2015 babel-preset-react --save-dev

npm i react react-dom --save

npm i express --save
```

Entry point in client.js
```
import React from 'react'
import { render } from 'react-dom'
import App from '../components/App'

render(
    //define the encompassing component,
    //DOM element we want to mount to 
  <App/>,
  document.getElementById('app')
)
```
And App.js will reference the all the other compoents
```
import React, { Component } from 'react'

class App extends Component {

  render() {
    return <div>This is definitely a hot (module reloading) React app now!</div>
  }

}
export default App
```


Set up webpack.config.js
> query: tell babel what to do for every js file, same as defining is babelrc file
> 
> devtool: source map is here for debugging, do not include this in production environment. It will tell you from origin source code what went wrong instead saying what line in bundle.js was wrong
```
var webpack = require('webpack');

module.exports = {
  entry: [
    './client/client.js'
  ],
  output: {
    path: require("path").resolve("./dist"),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'inline-source-map', 
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,   
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}
```
By this point, you can create bundle.js by typing
> --config: tell webpack what to do with your files using your congif
```
webpack --config webpack.config.js
```

React Notes: (https://www.youtube.com/watch?v=CAZZN1gOjoI&index=3&list=PLQDnxXqV213JJFtDaG0aE9vqvp6Wm7nBg).
