import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getName = () => {
    return dispatch => {
        axios.get('https://todo-milkevg.firebaseio.com/username.json')
            .then(res => {
                    if (res.data) dispatch(getNameAsync(res.data.name));
                    else dispatch(resetNameAsync())
                }
            );
    };
};

const getNameAsync = (name) => {
    return {
        type: actionTypes.GET_NAME,
        value: name
    }
};

export const resetName = () => {
    return dispatch => {
        axios.put('https://todo-milkevg.firebaseio.com/username.json', {})
            .then(res => {
                    dispatch(resetNameAsync());
                }
            );
    };
};

const resetNameAsync = () => {
    return {
        type: actionTypes.RESET_NAME
    }
};

export const putName = (newName) => {
    return dispatch => {
        axios.put('https://todo-milkevg.firebaseio.com/username.json', {name: newName})
            .then(res => {
                    dispatch(putNameAsync(newName));
                }
            );
    };
};

const putNameAsync = (newName) => {
    return {
        type: actionTypes.PUT_NAME,
        value: newName
    }
};

export const loadTodoList = () => {
    return dispatch => {
        axios.get('https://todo-milkevg.firebaseio.com/todos.json')
            .then(res => {
                    console.log(res);
                    dispatch(loadTodoListAsync(res.data));
                }
            );
    };
};

const loadTodoListAsync = (data) => {
    return {
        type: actionTypes.LOAD_TODOLIST,
        value: data
    }
};

export const showTodoItemLoader = (todoIndex) => {
    return {
        type: actionTypes.SHOW_TODOITEM_LOADER,
        value: todoIndex
    }
};

export const resolveTodoHandler = (todoId, todo) => {
    return dispatch => {
        axios.put(`https://todo-milkevg.firebaseio.com/todos/${todoId}.json`, todo)
            .then(res => {
                    dispatch(loadTodoList());
                }
            );
    };
};

export const showAddTodoItemLoader = () => {
    return {
        type: actionTypes.SHOW_ADD_TODOITEM_LOADER
    }
};

export const addTodo = (newTodo) => {
    return dispatch => {
        axios.post('https://todo-milkevg.firebaseio.com/todos/.json', newTodo)
            .then(res => {
                    dispatch(loadTodoList());
                }
            );
    };
};

export const deleteTodo = (todoId) => {
    return dispatch => {
        axios.delete(`https://todo-milkevg.firebaseio.com/todos/${todoId}.json`)
            .then(res => {
                    dispatch(loadTodoList());
                }
            );
    };
};
