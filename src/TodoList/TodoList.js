import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/index';
import TodoAdder from './TodoAdder/TodoAdder';
import classes from './Todolist.module.css';
import Loader from '../Loader/Loader';
import { FaRegTrashAlt } from 'react-icons/fa';

class TodoList extends Component {

    componentDidMount() {
        this.props.loadTodoList();
    }

    resolveTodoHandler(todo, index) {
        let changedTodo = {...todo};
        changedTodo.resolved = !changedTodo.resolved;
        delete changedTodo.id;
        this.props.showTodoItemLoader(index);
        this.props.resolveTodoHandler(todo.id, changedTodo);
    };

    deleteTodoHandler(todoId, index) {
        this.props.showTodoItemLoader(index);
        this.props.deleteTodo(todoId);
    }

    render() {
        let todos = null;

        if (this.props.todoList.length === 0 && !this.props.isTodoListLoaded) {
            todos = <Loader/>;
        }

        if (this.props.todoList.length === 0 && this.props.isTodoListLoaded) {
            todos = <h2>List is empty for now</h2>;
        }

        if (this.props.todoList.length > 0 && this.props.isTodoListLoaded) {
            todos = this.props.todoList.map((todo, index) => {
                return(
                    <div key={todo.id} className={classes.TodoItem}>
                        <div className={classes.Controls} style={{display: !todo.loading ? 'flex' : 'none'}}>
                            <label
                                style={{textDecoration: todo.resolved ? 'line-through' : 'none'}}
                                className={classes.container}> { todo.name }
                            <input
                                type="checkbox"
                                name={todo.name}
                                value={todo.id}
                                id={todo.id}
                                defaultChecked={todo.resolved}
                                onChange={() => this.resolveTodoHandler(todo, index)}/>
                            <span className={classes.checkmark}></span>
                            </label>
                            <button onClick={this.deleteTodoHandler.bind(this, todo.id, index)}>
                                <FaRegTrashAlt/>
                            </button>
                        </div>
                        <div className={classes.Loader} style={{display: !todo.loading ? 'none' : 'flex'}}>
                            <Loader/>
                        </div>
                    </div>
                )
            })
        }

        return(
            <div style={{display: this.props.showTodoList ? 'block' : 'none'}} className={classes.Main}>
                <h1>{ this.props.todoList.length } TO DO</h1>
                <div style={{
                    display: this.props.todoList.length > 0 && this.props.isTodoListLoaded ? 'block' : 'flex'
                }}
                    className={classes.TodoSection}
                    >
                    {todos}
                </div>
                <div>
                    <TodoAdder/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        showTodoList: state.showTodoList,
        todoList: state.todoList,
        isTodoListLoaded: state.isTodoListLoaded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTodoList: () => dispatch(actionCreators.loadTodoList()),
        resolveTodoHandler: (todoId, changedTodo) => dispatch(actionCreators.resolveTodoHandler(todoId, changedTodo)),
        showTodoItemLoader: (todoIndex) => dispatch(actionCreators.showTodoItemLoader(todoIndex)),
        deleteTodo: (todoId) => dispatch(actionCreators.deleteTodo(todoId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
