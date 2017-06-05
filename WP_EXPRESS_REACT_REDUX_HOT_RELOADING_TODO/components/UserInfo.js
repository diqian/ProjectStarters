import React, { Component } from 'react';
import TodoItem from './TodoItem';

class UserInfo extends Component {

    constructor(props){
        super(props);
    }

    handleNewId() {
        //dispatch an action
        this.props.createNewUserId();
    }

    render() {
        return (
            <div>
                <div>username: {this.props.user.username}</div>
                <div>id: {this.props.user.id}</div>
                <button onClick={this.handleNewId.bind(this)}>Update with random Id</button>

            </div>
        )
    }
}

export default UserInfo