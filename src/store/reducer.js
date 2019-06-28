import * as actionTypes from './actionTypes';

const initialState = {
    name: '',
    showWelcome: false,
    showNameRequest: false,
    showTodoList: false,

    todoList: [],
    isTodoListLoaded: false,
    isAddingItemLoading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.GET_NAME:
            return {
                ...state,
                name: action.value,
                showNameRequest: false,
                showWelcome: true,
                showTodoList: true
            };

        case actionTypes.RESET_NAME:
            return {
                ...state,
                showWelcome: false,
                showNameRequest: true,
                showTodoList: false
            };

        case actionTypes.PUT_NAME:
            return {
                ...state,
                name: action.value,
                showWelcome: true,
                showNameRequest: false,
                showTodoList: true
            };

        case actionTypes.LOAD_TODOLIST:
            let todoList = [];
            const receivedData = action.value;
            if ( receivedData ) {
                for (let key in receivedData) {
                    todoList.push({
                        id: key,
                        name: receivedData[key].name,
                        resolved: receivedData[key].resolved,
                        loading: false
                    })
                }
            }
            return {
                ...state,
                isTodoListLoaded: true,
                todoList: todoList,
                isAddingItemLoading: false
            };

        case actionTypes.SHOW_TODOITEM_LOADER:
            let todoListWithLoadingItem = [...state.todoList];
            todoListWithLoadingItem[action.value].loading = true;
            return {
                ...state,
                todoList: todoListWithLoadingItem
            };

        case actionTypes.SHOW_ADD_TODOITEM_LOADER:
            return {
                ...state,
                isAddingItemLoading: true
            };

        default: return state;
    }
};

export default reducer;
