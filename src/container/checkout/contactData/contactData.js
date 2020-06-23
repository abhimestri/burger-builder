import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class Contactdata extends Component {

    state = {
        orderForm : {
                name: {
                    elementType : "input",
                    elementConfig : {
                        type : 'text',
                        placeholder : "your name",
                    },
                    value : '',
                    validation : {
                        required : true,
                        touched : false
                    },
                    valid :false
                },
                street:{
                    elementType : "input",
                    elementConfig : {
                        type : 'text',
                        placeholder : "street",
                    },
                    value : '',
                    validation : {
                        required : true,
                        touched : false
                    },
                    valid :false
                },
                zipcode : {
                    elementType : "input",
                    elementConfig : {
                        type : 'text',
                        placeholder : "ZIP CODE",
                    },
                    value : '',
                    validation : {
                        required : true,
                        touched : false,
                        minLenght : 5,
                        maxLenght : 5
                    },
                    valid :false
                },
                country : {
                    elementType : "input",
                    elementConfig : {
                        type : 'text',
                        placeholder : "your country",
                    },
                    value : '',
                    validation : {
                        required : true,
                        touched : false
                    },
                    valid :false
                },
                email:{
                    elementType : "input",
                    elementConfig : {
                        type : 'email',
                        placeholder : "your E-mail",
                    },
                    value : '',
                    validation : {
                        required : true,
                        touched : false
                    },
                    valid :false
                },
                deliveryMethod:{
                    elementType : "select",
                    elementConfig : {
                        options : [
                            {type:"fastest" ,  displayValue : "Fastest"},
                            {type:"cheapest" ,  displayValue : "Cheapest"}
                        ]
                    },
                    validation : {},
                    valid : true,
                    value : '',
                },
        },
        formIsValid : false,
        loading : false
    }

    checkValidity = (value,rules) => {

        let isValid = true;

        if(!rules){
            return true
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLenght && isValid
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLenght && isValid
        }
        return isValid
    }

    orderHandler = (e) => {
        e.preventDefault()
        console.log(this.props.ingredients)
        this.setState({loading:true})
        const formData ={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const orders = {
            ingreadients : this.props.ingredients,
            Price : this.props.price,
            orderData : formData
        }
        axios.post('./orders.json',orders)
            .then(
                this.setState({loading:false }),
                this.props.history.push('/')
            )
            .catch(
                this.setState({loading:false})
            );

    }

    inputChangedHandler = (e,inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value , updatedFormElement.validation )
        updatedFormElement.touched  = true
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        console.log(updatedFormElement);
        this.setState({orderForm : updatedOrderForm , formIsValid : formIsValid})
    }

    render(){

        const formElementsArray = [];

        for(let key in this.state.orderForm){
            formElementsArray.push({
                id : key,
                config : this.state.orderForm[key]
            })
        }

        let form =(
            <div className="container mb-5">
                    <form onSubmit={this.orderHandler}>
                       {formElementsArray.map(formElement => (
                           <div className="form-group">
                               <Input 
                                    changed ={(e) => this.inputChangedHandler(e,formElement.id)}
                                    touched = {formElement.config.touched}
                                    key = {formElement.id}
                                    shouldValidate = {!formElement.config.validation}
                                    invalid = {formElement.config.valid}
                                    elementType = {formElement.config.elementType} 
                                    elementConfig = {formElement.config.elementConfig}
                                    value = {formElement.config.value}
                                 />
                           </div>
                        ))}
                       <Button btnType="Success" disabled={!this.state.formIsValid} clicked = {this.orderHandler}>ORDER</Button>
                    </form>
                </div>
        );
        if(this.state.loading){
            form = <Spinner/>
        }

        return(
            <div>
                <h4 className="ml-4">enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default Contactdata