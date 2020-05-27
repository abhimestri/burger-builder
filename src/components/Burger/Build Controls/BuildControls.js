import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl.js'

const control = [
    {label : 'Salad' , type:'salad'},
    {label : 'Bacon' , type:'bacon'},
    {label : 'Cheese' , type:'cheese'},
    {label : 'Meat' , type:'meat'}
]

const buildControl = (props) => (
    <div className = {classes.BuildControl}>
        {control.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added = {() => props.ingredientAdded(ctrl.type)}
                removed = {() => props.ingredientRemoved(ctrl.type)}
                disabled = {props.disabled[ctrl.type]}
                />
        ))}
        <button 
            disabled={!props.purchasable} 
            className={classes.OrderButton}
            onClick={props.ordered}
                >ORDER NOW</button>
    </div>
);

export default buildControl