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
