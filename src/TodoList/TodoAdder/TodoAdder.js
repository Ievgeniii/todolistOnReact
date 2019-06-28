import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/index';
import classes from './TodoAdder.module.css';
import Loader from '../../Loader/Loader';
import { FaPlus } from 'react-icons/fa';

class TodoAdder extends Component {
    state = {
        indicateError: false
    };

    todoItemInput = React.createRef();

    onAddHandler = (value) => {
        if (value.length === 0 || value.trim() === '') {
            this.setState({indicateError: true});
        } else {
            this.props.addTodo({
                loading: false,
                name: this.todoItemInput.current.value,
                resolved: false
            });
            this.props.showAddTodoItemLoader();
            this.todoItemInput.current.value = '';
        }
    };

    resetErrorIndication = () => {
        this.setState({indicateError: false})
    };

    render() {
        return(
            <div className={classes.Todoadder}>
                <div style={{display: !this.props.isAddingItemLoading ? 'block' : 'none'}}>
                    <input
                        type="text"
                        ref={this.todoItemInput}
                        style={{background: this.state.indicateError ? '#ffc4c4' : 'white'}}
                        onChange={this.resetErrorIndication}/>
                    <button
                        onClick={() => this.onAddHandler(this.todoItemInput.current.value)}>
                        Add
                        <span> <FaPlus/> </span>
                    </button>
                    <p style={{display: this.state.indicateError ? 'block' : 'none'}}>
                        Value cannot be empty!
                    </p>
                </div>

                <div style={{display: !this.props.isAddingItemLoading ? 'none' : 'block'}}>
                    <Loader/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAddingItemLoading: state.isAddingItemLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addTodo: (newTodo) => dispatch(actionCreators.addTodo(newTodo)),
        showAddTodoItemLoader: () => dispatch(actionCreators.showAddTodoItemLoader())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoAdder);
