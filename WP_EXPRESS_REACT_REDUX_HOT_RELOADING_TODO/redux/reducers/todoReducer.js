//helper method to insure each todo has unique id
function getId(state) {
    return state.todos.reduce((maxId, todo) => {
            return Math.max(todo.id, maxId)
        }, -1) + 1
}

let todoReducer = function(todos, action) {
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
            });
        case 'COMPLETE_TODO':
            return Object.assign({}, state, {
                todos: state.todos.map((todo) => {
                    console.log(`todo.id is: ${todo.id}`);
                    console.log(`action.id is: ${action.id}`);
                    return todo.id === action.id ?
                        Object.assign({}, todo, {completed: !todo.completed}) : todo
                })
            });
        case 'DELETE_TODO':
            return Object.assign({}, state, {
                todos: state.todos.filter( (todo) => {
                    return todo.id !== action.id;
                })
            });
        default:
            return state;
    }
}

export default todoReducer