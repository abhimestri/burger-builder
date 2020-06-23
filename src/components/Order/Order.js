import  React from 'react'
import classes from './Order.css'


const order = (props) => {

    const ingredientss = [];

    for(let ingredientsName in  props.ingredients){
        ingredientss.push({
                name : ingredientsName ,
                amount : props.ingredients[ingredientsName]
            })
    }

    const ingredientsOutput = ingredientss.map(ig => {
        return <span 
            style={{
                textTransform : 'capitalize',
                display: "inline-bock",
                margin: '0 8px',
                border : '1px solid #ccc',
                padding  :'5px'
            }}
            key={ig.name} >{ig.name}:({ig.amount})</span>
    })

    return(
        <div className={classes.Order}>
            <p>ingredients:{ingredientsOutput} </p>
            <p> price: <strong>{props.price.toFixed(2)}$</strong></p>
        </div>
    )
}
export default order