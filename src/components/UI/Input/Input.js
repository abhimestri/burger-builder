import React from 'react'
import classes from './Input.css'

const input = (props) => {

    let inputElement = null;
    let inputClasses = ["form-control"];

    if(props.invalid && props.shouldValidate && props.touched ){
        inputClasses.push('is-invalid')
    }

    switch(props.elementType){
        case('input') : 
                        inputElement = <input 
                                        key ={props.key}
                                        className = {inputClasses.join(' ')}
                                        {...props.elementConfig}
                                         value={props.value}
                                        onChange={props.changed}
                                         />
                        break;
        case('textarea') :
                        inputElement = <textarea 
                                        key ={props.key}
                                        className={inputClasses.join(' ')}
                                        {...props.elementConfig}
                                        value={props.value} 
                                        onChange={props.changed}
                                        />
                        break;
        case('select') :
                        inputElement = (
                            <select
                                key ={props.key}
                                className={inputClasses.join(' ')}
                                value={props.value} 
                                onChange={props.changed}>
                                {props.elementConfig.options.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.displayValue}
                                    </option>
                                ))}
                                </select>
                        )
                        break;
        default : 
            inputElement = <input
                            key ={props.key}
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value} 
                            onChange={props.changed}
                            />
    }

    return (
        <div key ={props.key} className={classes.Input} >
            <label key ={props.key} className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input