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