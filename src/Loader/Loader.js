import React from 'react';
import classes from './Loader.module.css';

const loader = () => {
    return(
        <div className={classes['lds-facebook']}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default loader;
