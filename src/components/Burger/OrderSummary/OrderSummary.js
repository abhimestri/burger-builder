import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    componentDidUpdate(){
        console.log('orderSummary is updated')
    }
    render(){
        const ingredientsSummary = Object.keys(this.props.ingredients)
                                .map(igkey => {
                                return <li key={igkey}>
                                    <span style={{textTransform:'capitalize'}}>{igkey}</span>
                                    : {this.props.ingredients[igkey]}</li>
                                });

      return (
        <Aux>
            <h3>your order summary</h3>
            <p>your delecious burger has following ingredients</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <h4>total cost : <strong>{this.props.totalPrice.toFixed(2)}$</strong></h4>
            <p>continue to checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}> CANCLE </Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}> CONTINUE </Button>
        </Aux>
      );
    }
}

export default OrderSummary;