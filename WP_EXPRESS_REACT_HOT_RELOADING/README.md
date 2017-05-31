## How to run
npm run serve

## How it work?
> We will have express server, running in server/server.js. It will serve the dist folder as static files. client/index.html will include dist/bundle.js, and be rendered as root page. Also, index.html will have the anchor for react to bind to. Thus, we use client.js to connect App.js with the anchor, and App.js will have reference to all the other files, and client.js will be the entry point for webpack to create bundle.js.
>
> Here, we use webpack as a middleware in our server, and once we do that, we can use a modules called one hot reloading to do the reloading, which will change things immediately in the bundle.js if you made any changes. Notice: you won't be able to see bundle.js being created, because they are in memory during development mode. 
>
> We also utilized 2 webpack middleware. In the end, the browser will auto refresh on change we made!!!

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

## Adding support for hot-module-reloading
First, we don't want nodemon to restart server anytime we changed code in components, because webpack is already watching these changes and rebuilding bundle.js, thus
Change script in package.json to
```
"serve": "nodemon server/server.js --ignore components"
```

Install 2 middleware. When we run server, the middleware knows about our config, because we passed in there
```
npm install --save-dev webpack-dev-middleware webpack-hot-middleware
```

Now, install babel-preset-react-hmre (hot module reloading)
(https://www.npmjs.com/package/babel-preset-react-hmre)
Also, install webpack-hot-middleware. (https://github.com/glenjamin/webpack-hot-middleware).
```
npm install babel-preset-react-hmre --save-dev
```
Modify babel.config.js to add support
```
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './client/client.js'
  ],
  output: {
    path: require("path").resolve("./dist"),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'inline-source-map', //for debugging
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'react-hmre']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
```
Tutorial: (http://madole.github.io/blog/2015/08/26/setting-up-webpack-dev-middleware-in-your-express-application/)

>noInfo: true: don't output anything that webpack outputted
---
Now In server.js, add support for these hot reloading middlewares
```
...
var config = require('../webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();
//app.use(webpack in dev mode)
var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));

app.use(webpackHotMiddleware(compiler));
...
...
```

React Notes: (https://www.youtube.com/watch?v=CAZZN1gOjoI&index=3&list=PLQDnxXqV213JJFtDaG0aE9vqvp6Wm7nBg).
