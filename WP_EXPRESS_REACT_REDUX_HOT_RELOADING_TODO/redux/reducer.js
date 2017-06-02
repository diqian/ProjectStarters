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