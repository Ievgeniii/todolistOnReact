import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/index';
import classes from './User.module.css';
import NameInput from './NameInput/NameInput';
import { FaSignOutAlt } from 'react-icons/fa';
import Loader from '../Loader/Loader';

class User extends Component {

    componentDidMount() {
        this.props.getName();
    }

    render() {
        return(
            <div className={classes.User}>
                <div style={{display: !this.props.showWelcome && !this.props.showNameRequest ? 'block' : 'none'}}>
                    <Loader/>
                </div>
                <div
                    style={{display: this.props.showWelcome ? 'block' : 'none'}}
                    className={classes.Welcome}>
                    <h1> Hello, { this.props.name }!</h1>
                    <button onClick={this.props.resetName}>
                        Log Out
                        <span> <FaSignOutAlt/> </span>
                    </button>
                </div>
                <div style={{display: this.props.showNameRequest ? 'block' : 'none'}}>
                    <NameInput/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: state.name,
        showWelcome: state.showWelcome,
        showNameRequest: state.showNameRequest
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getName: () => dispatch(actionCreators.getName()),
        resetName: () => dispatch(actionCreators.resetName())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
