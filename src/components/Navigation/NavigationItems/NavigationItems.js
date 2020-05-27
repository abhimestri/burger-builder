import React from 'react'
import NavigationItem from './NavigationItem/Navigationitem'
import classes from './NavigationItems.css'

const navigationitems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/" >checkout</NavigationItem>
    </ul>
);

export default navigationitems