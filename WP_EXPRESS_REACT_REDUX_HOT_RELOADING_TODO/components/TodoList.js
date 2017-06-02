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