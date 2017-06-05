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
        // before mapDispatchToProps is available, we have to write this
        // this.props.dispatch(actions.addTodo(this.state.inputText))
        this.props.addTodo(this.state.inputText);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text"
                    placeholder="put some text here"
                    value={this.state.inputText}
                    onChange={this.handleChange.bind(this)}
                    />
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default ToDoInput