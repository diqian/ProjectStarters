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

## Notes on File Naming Convention
Compoent name should be captialized


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

## Redux
Redux is an implementation of flux.


Store: which hold all the state, component don't hold state anymore. Store pass state down to components, and when component get state as prop, they pass these prop to it's children.
But we need way to change state, so how do we do it?
Whatever changes the state, our component fire an acitons, which could change state. Action has type property, eg ADD_TODO, so you know what to do with the aciton. Once you have an action, it get passed to a dispatcher, which takes in all the actions, and one at a time, it send these actions to store. So actions ultimately update the state in store. Once state is changed in store, changes will be reflected in components. Everything is uni-driectional, flow in one way.


Store(state) => Components => Actions(type: ADD_TODO, data: 'sth') => Dispatcher => Store(state) => .... 

Redux: single state tree, state is read-only (only fire action), reducers are pure functions that take in (state, action), and return new state. Reducer generally has switch statement, you switch on the (action.type), and returned the new state(copy the state, and then set the state). 

Store(state) => Components => Actions(type: ADD_TODO, data: 'sth') => Dispatcher => Reducers(current state, action) => Store(state) => .... 



## Redux setup
```
npm install --save redux react-redux
```
```
npm install --save redux-logger (you can see action happening, and the state)
```
Now, we want to set up the flow
Store(state) => Components => Actions(type: ADD_TODO, data: 'sth') => Dispatcher => Reducers(current state, action) => Store(state) => .... 
In this todo app, how can we add a simple todo?

1. Let's create our store, which main all the state.
Here, we created a configureStore function, which take in all the initialState that we set up, and reducers to create a store object
```
import { applyMiddleware, compose, createStore } from 'redux';
// this middleware will log out the our action and state
import { createLogger } from 'redux-logger';
import reducer from './reducer';

// Add middleware
// compose take in a fnction and return a function
let finalCreateStore = compose(
    applyMiddleware(createLogger())
)(createStore)

// if initialState is not passed to us, then we set it do default value, here is {todo: []}
export default function configureStore(initialState = {todo: []}){
    return finalCreateStore(reducer, initialState);
}
```
Once the configuStore is defined, we should initlize it in client.js, which is our entry point,
we set up intiliaState, and pass it in confiqureStore. Now, we get a provider component, which wrap around our app
and pass state to provider. So it has the ability to pass state to app as prop.
In client.js
```
import React from 'react'
import { render } from 'react-dom'
import App from '../components/App'
import configureStore from '../redux/store'
// it's a react component, it helps us to connect store to our
// react commponent, it wrap around your app, and it get the store and passed as a prop
import { Provider } from 'react-redux' 

// configure and create our store
// createStore(reducers, intilialState)
let initialState = {
    todos: [{
        id: 0,
        completed: false,
        text: 'Initial todo for demo purposes'
    }]
}
let store = configureStore(initialState);

//define the encompassing component,
//DOM element we want to mount to 
render(
    <Provider store={store}>        
        <App/>
    </Provider>,
    document.getElementById('app')
)
```
Now, store is almost ready to use. We now have Provider who is passing dispatch and state to it's children. We also have to let child connect with store.

In app.js, we connect with Provider through connect method from react-redux. Now, our app can use this.props.dispatch and this.props.todos.
Now, we pass the dispatcher function to todoInput, let in be able to fire an action. And pass this.props.todos to TodoList. Let it be able to display all the todos from states.
```
import React, { Component } from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
// connect: take your component that you want to connect to store
// and return a new compoent
import { connect } from 'react-redux' 


//this.props.todos, are passing down from store, and because you connected your componennt,
//you have access to everythign in provider(your store)

//this.props.dispatch is also passed down from provider through the help of this
// conenct function, 
class App extends Component {

  render() {
    return (
        <div>
            <h1>This is A TODO APP</h1>
            <TodoInput dispatch={this.props.dispatch} />
            <TodoList todos={this.props.todos} />
        </div>
    )
  }
}

// connect expect a function as first input, and it will throw state to that function
// you want to return state that your component is getting.
// in this case, we want all the state
function mapStateToProps(state) {
    return state;
}

//this new connected component will be able to listen for changes in the provider (which is store), and can get state from provider
//Notice: you are not exporting your app, you are exporing connected App
export default connect(mapStateToProps)(App)

```
In order to let todoInput fire an action, we first define an action with type and payload
In actions.js
```
let actions = {
    addTodo: function(text) {
        return {
            type: 'ADD_TODO',
            text: text
        }
    }
}
export default actions
```
Once actions is defined, we should let reducer know how to change the state once the action is fired
In reducer.js
```
//helper method to insure each todo has unique id
function getId(state) {
    return state.todos.reduce((maxId, todo) => {
        return Math.max(todo.id, maxId)
    }, -1) + 1
}

let reducer = function(state, action) {
    switch(action.type) {
        case 'ADD_TODO':
            // it first put all state into new {} object
            // and then override the todo part with new todos
            return Object.assign({}, state, {
                todos: [
                    {
                        //add new todo info
                        text: action.text,
                        completed: false,
                        id: getId(state)
                    }, ...state.todos //use spread to add all existing state
                ]
            })
        default: 
            return state;
    }
}

export default reducer
```
Now action, and reducer is ready, let's make the action to be fired by todoInput.
In TodoInput.js, in handleSubmit, we dispatch the action that we want to fire.
Once fired, payload is also passed along, and reducer will be called to genereate new state based on the action
and the new state will be returned, and the targetted state is updated accordingly.
```
import React, { Component } from 'react';
import actions from '../redux/actions' 


class ToDoInput extends Component {

    constructor(props){
        super(props);
        this.state = {
            inputText: ""
        }
    }

    handleChange(event) {
        this.setState({
            inputText: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(actions.addTodo(this.state.inputText))
    }

    render() {
        return (
            <div>
                <input type="text"
                placeholder="put some text here"
                value={this.state.inputText}
                onChange={this.handleChange.bind(this)}
                />
                <button onClick={this.handleSubmit.bind(this)}>Submit</button>
            </div>
        )
    }
}

export default ToDoInput
```
Finally, through TodoList, we can see the updated html
In TodoList.js
```
import React, { Component } from 'react';

class TodoList extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                This is todolist
                <ul>
                    {
                        this.props.todos.map((todo) => {
                            return <li key={todo.id}>{todo.text}</li>
                        })
                    }
                </ul>  
            </div>
        )
    }
}

export default TodoList
```







## React common mistake (Redux is not here, state here has nothing to do with redux)

If you put a value equal to something, it will be unchangeable unless you add a onChange listener. Notice here, in handleChange, if we didn't bind(this), then "this" will be null.
```
import React, { Component } from 'react';

class TextInput extends Component {

    constructor(props){
        super(props);
        this.state = {
            inputText: "hello"
        }
    }

    handleChange(event) {
        console.log(this);
        console.log(event);
        this.setState({
            inputText: event.target.value
        });
    }

    render() {
        return (
            <div>
                This is textdisplay
                <input type="text"
                placeholder="put some text here"
                value={this.state.inputText}
                onChange={this.handleChange.bind(this)}
                />
            </div>
        )
    }
}

export default TextInput
```



React Notes: (https://www.youtube.com/watch?v=CAZZN1gOjoI&index=3&list=PLQDnxXqV213JJFtDaG0aE9vqvp6Wm7nBg).
