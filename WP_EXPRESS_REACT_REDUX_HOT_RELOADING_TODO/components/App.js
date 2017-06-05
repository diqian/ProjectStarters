import React, { Component } from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import UserInfo from './UserInfo'
// connect: take your component that you want to connect to store
// and return a new compoent
import { connect } from 'react-redux' 
import { bindActionCreators} from 'redux'
import actions from '../redux/actions'

//this.props.todos, are passing down from store, and because you connected your componennt,
//you have access to everythign in provider(your store)

//this.props.dispatch is also passed down from provider through the help of this
// conenct function, 
class App extends Component {
    // before mapDispatchToProps, we have to write this way
    //  <TodoInput dispatch={this.props.dispatch} />
    // <TodoList dispatch={this.props.dispatch} todos={this.props.todos} />
  render() {
    return (
        <div>
            <h1>This is A TODO APP</h1>
            <UserInfo user={this.props.user} createNewUserId={this.props.actions.createNewUserId}/>
            <TodoInput addTodo={this.props.actions.addTodo} />
            <TodoList actions={this.props.actions} todos={this.props.todos} />
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
//we don't want to pass dispatch every time like
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

//this new connected component will be able to listen for changes in the provider (which is store), and can get state from provider
//Notice: you are not exporting your app, you are exporing connected App
export default connect(mapStateToProps, mapDispatchToProps)(App)
