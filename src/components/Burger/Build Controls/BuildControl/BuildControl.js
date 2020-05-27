import React from 'react';
import classes from './BuildControl.css'

const buildControl = (props) => (

            <div className={classes.BuildControl}>
                <div className={classes.Label}>{props.label}</div>
                <button className="btn btn-success ml-3" onClick={props.added} >Add </button>
                <button className="btn btn-warning ml-3" onClick={props.removed} disabled={props.disabled}>Remove </button>
            </div>
);

export default buildControl