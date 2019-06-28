import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './NameInput.module.css';
import * as actionCreators from '../../store/index';
import { FaSignInAlt } from 'react-icons/fa';

class NameInput extends Component {
    state = {
        indicateError: false
    };

    nameInput = React.createRef();

    checkNameHandler = (name) => {
        if (name.length === 0 || name.trim() === '') {
            this.setState({indicateError: true});
        } else {
            this.props.putName(name);
        }
    };

    resetErrorIndication = () => {
        this.setState({indicateError: false})
    };

    render() {
        return(
            <div className={classes.NameRequest}>
                <h2>Welcome!</h2>
                <p>Please type your name to get access to the TodoList</p>
                <input
                    type="text"
                    ref={this.nameInput}
                    style={{background: this.state.indicateError ? '#ffc4c4' : 'white'}}
                    onChange={this.resetErrorIndication}/>
                <button
                    onClick={() => this.checkNameHandler(this.nameInput.current.value)}>
                    Log In <span> <FaSignInAlt/> </span>
                </button>
                <p style={{display: this.state.indicateError ? 'block' : 'none'}}>
                    Name cannot be empty!
                </p>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        putName: (newName) => dispatch(actionCreators.putName(newName))
    };
};

export default connect(null, mapDispatchToProps)(NameInput);
