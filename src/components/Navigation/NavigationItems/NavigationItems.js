import React from 'react'
import NavigationItem from './NavigationItem/Navigationitem'
import classes from './NavigationItems.css'

const navigationitems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders" >Orders</NavigationItem>
    </ul>
);

export default navigationitems