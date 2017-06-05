import React, { Component } from 'react';
import TodoItem from './TodoItem';

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
                            return <TodoItem key={todo.id} todo={todo} actions={this.props.actions}/>
                        })
                    }
                </ul>  
            </div>
        )
    }
}

export default TodoList