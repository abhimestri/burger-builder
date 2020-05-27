import React from 'react'
import classes from './Burger.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients.js'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients.js';


const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
                                .map(igKey => {
                                    return ([...Array(props.ingredients[igKey])]).map((_,i) => {
                                        return <BurgerIngredient key={igKey+i} type={igKey}/>
                                    })
                                })
                                .reduce((arr,el) => {
                                    return arr.concat(el);
                                },[]);

    if((transformedIngredients.length) === 0){
        transformedIngredients = <p className="text-primary">please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger} >
            <BurgerIngredients type="bread-top" />
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
            {/* <div>everything is correct in burger</div> */}
        </div>
    );
};

export default burger;