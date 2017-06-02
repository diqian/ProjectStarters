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
