import React, {Component}from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/Build Controls/BuildControls.js'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandle/withErrorHandle'

// {label : 'salad' , type:'salad'},
// {label : 'bacon' , type:'bacon'},
// {label : 'cheese' , type:'cheese'},
// {label : 'meat' , type:'meat'}

const INGREDIENT_PRICES = {
    salad: 0.4,
    meat:1.3,
    cheese : 0.5,
    bacon:0.8
}

class  BurgerBuilder extends Component{

    state = {
        ingredients : null,
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }

    componentDidMount(){
        console.log(this.props)
        axios.get('https://burger-builder-fe96a.firebaseio.com/ingredients.json')
                .then(res => {
                   this.setState({
                    ingredients : res.data
                   })
                })
                .catch(err => {
                    this.setState({error:true})
                })
    }

    updatedPurchseState (ingreadients) {
        const sum = Object.keys(ingreadients)
                    .map(igkey => {
                        return ingreadients[igkey];
                    })
                    .reduce((sum,el) => {
                        return sum+el;
                    },0);
            this.setState({purchasable:sum>0});
    }

    addIngredientHandler = (type) => {
        const  oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        } 
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+priceAddition;
        this.setState({totalPrice : newPrice,ingredients : updatedIngredients});
        this.updatedPurchseState(updatedIngredients);
    }
    deleteIngredient = (type) => {
        const  oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return ;
        }
        const updatedCount = oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        } 
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice-priceDeduction;
        this.setState({totalPrice : newPrice,ingredients : updatedIngredients});
        this.updatedPurchseState(updatedIngredients);
    }


    purchaseHandler = (props) => {
        this.setState({purchasing:true})
    }

    purchaseCancleHandler =(props) => {
        this.setState({purchasing:false})   
    }

    purchaseContinueHandler = (props) => {
        
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search : '?' + queryString
        })
    }

    render(){
        const disabledInfo ={
             ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        let burger =  this.state.error ? 'ingredients cant be loaded' : <Spinner/>

        if(this.state.ingredients ){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <div>
                        <h2 className="text-center text-success">your total cost is :<strong className="text-dark">{this.state.totalPrice.toFixed(2)}$</strong></h2>
                    </div>
                    <BuildControls
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.deleteIngredient}
                        purchasable = {this.state.purchasable}
                        ordered = {this.purchaseHandler}
                        disabled = {disabledInfo}
                    />
                </Aux>
            )
            orderSummary =  <OrderSummary 
                                totalPrice ={this.state.totalPrice}
                                ingredients = {this.state.ingredients}
                                purchaseCancelled = {this.purchaseCancleHandler}
                                purchaseContinued = {this.purchaseContinueHandler}
                            />
        }
        if(this.state.loading){
            orderSummary = <Spinner/>
        }
        
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}

export default withErrorHandler(BurgerBuilder , axios)