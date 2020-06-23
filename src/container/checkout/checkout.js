import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/checkoutSummary/checkoutSummary'
import {Route } from 'react-router-dom'
import ContactData from './contactData/contactData'


class Checkout extends Component{
    state = {
        ingredients : null,
        price : 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search)
        const ingredient = {};
        let price = 0;
        for(let param of query.entries()){

            if(param[0] === 'price'){
                price = param[1];
            }else{
                ingredient[param[0]] = +param[1];
            }
        }
        this.setState({ingredients : ingredient , totalPrice : price})
    }

    checkoutCancelledHandle = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients ={this.state.ingredients} 
                    checkoutCancelled = {this.checkoutCancelledHandle}
                    checkoutContinued = {this.checkoutContinuedHandler}
                    />
                <Route path={this.props.match.path + '/contact-data' } 
                        render = {(props) => (<ContactData  ingredients ={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
            </div>
        )
    }

}

export default Checkout