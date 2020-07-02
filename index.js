const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOALS = 'ADD_GOALS';
const REMOVE_GOALS = 'REMOVE_GOALS';

const generateId = () => {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
  }
const addTodoCreater = (todo) => {
    return {
        type: ADD_TODO,
        todo,
    }
}
const toggleTodoCreater = (id) => {
    return {
        type: TOGGLE_TODO,
        id,
    }
}
const removeTodoCreater = (id) => {
    return {
        type: REMOVE_TODO,
        id,
    }
}
const addGoalCreater = (goal) => {
    return {
        type: ADD_GOALS,
        goal,
    }
}
const removeGoalCreater = (goal) => {
    return {
        type: REMOVE_GOALS,
        goal,
    }
}



const todos = (state = [], action) => {

    switch(action.type) {
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO:
            return state.map((todo) => todo.id !== action.id ? todo :
            Object.assign({}, todo, {complete: !todo.complete}))
        default:
            return state;
    }
}

const goals = (state = [], action) => {
    switch(action.type) {
        case ADD_GOALS:
            return state.concat([action.goal])
        case REMOVE_GOALS:
            return state.filter((goal) => goal.id !== action.id )
        default:
            return state;
    }
}

const app = (state = {}, action) => {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}


const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);

        return () => {
            listeners = listeners.filter((l) => l !== listener )
        }
    }

    const dispatch = (action) => {
        state = reducer(state,action);
        listeners.forEach((listener) => listener())
    }

    return {
        getState, subscribe, dispatch
    }
}

const store = createStore(app)

store.subscribe(() => {
    const { goals, todos } = store.getState();

    document.getElementById('todos').innerHTML = '';
    document.getElementById('goals').innerHTML = '';

    goals.forEach(addGoalToDOM);
    todos.forEach(addTodoToDOM);
})

const addTodo = () => {
    const input = document.getElementById('todo');
    const name = input.value;
    input.value = '';

    store.dispatch(addTodoCreater({
        id: generateId(),
        name,
        complete: false
    }))
}
const addGoal = () => {
    const input = document.getElementById('goal');
    const name = input.value;
    input.value = '';

    store.dispatch(addGoalCreater({
        id: generateId(),
        name,
    }))
}
const toggleTodo = (e) => {
    console.log(e.target.id)
}
document.getElementById('todoBtn').addEventListener('click',addTodo);
document.getElementById('goalBtn').addEventListener('click',addGoal);

const addTodoToDOM = (todo) => {
    const node = document.createElement('li');
    const text = document.createTextNode(todo.name);
    node.appendChild(text);

    document.getElementById('todos').appendChild(node);
    node.style.textDecoration = todo.complete ? 'line-through' : 'none';
    node.addEventListener('click',() => {
        store.dispatch(toggleTodoCreater(todo.id))
    });
}
const addGoalToDOM = (goal) => {
    const node = document.createElement('li');
    const text = document.createTextNode(goal.name);
    node.appendChild(text);

    document.getElementById('goals').appendChild(node);
}
// store.dispatch(addTodoCreater({
//     id: 0,
//     name: 'learn Redux Tashfeen',
//     complete: false
// }))
// store.dispatch(addTodoCreater({
//     id: 1,
//     name: 'learn Redux Tashfeen',
//     complete: false
// }))
// store.dispatch(addTodoCreater({
//     id: 2,
//     name: 'learn Redux Tashfeen',
//     complete: false
// }))
// store.dispatch(addTodoCreater({
//     id: 3,
//     name: 'learn Redux Tashfeen',
//     complete: false
// }))
// store.dispatch(addTodoCreater(1))
// store.dispatch(addTodoCreater(2))
// store.dispatch(addTodoCreater({
//     id: 1,
//     name: 'learn Redux Tashfeen',
//     complete: true
// }))
// store.dispatch(addGoalCreater({
//     id: 0,
//     name: 'Make Goals Tashfeen',
// }))
// store.dispatch(addGoalCreater({
//     id: 1,
//     name: 'Make Goals Tashfeen',
// }))
// store.dispatch(addGoalCreater({
//     id: 2,
//     name: 'Make Goals Tashfeen',
// }))