import React from 'react'
import classes from './Burger.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients.js'


const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
                                .map(igKey => {
                                    console.log(props.ingredients[igKey])
                                    return [...Array(props.ingredients[igKey])].map((_,i) => {
                                        return <BurgerIngredients key={igKey+i+1} type={igKey}/>
                                    })
                                })
                                .reduce((arr,el) => {
                                    return arr.concat(el);
                                },[]);
    
//   let transformedIngredients = Object.keys(props.ingredients).map((igKey, i) => (
//     <BurgerIngredients key={igKey + i} type={igKey} />
//   ));


    if((transformedIngredients.length) === 0){
        transformedIngredients = <p className="text-primary">please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger} >
            <BurgerIngredients type="bread-top" />
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
};

export default burger;