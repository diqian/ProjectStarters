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