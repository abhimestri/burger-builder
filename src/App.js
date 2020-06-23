import React, { Component } from 'react';
import Layout from './hoc/layout/layout';
import {Route , Switch} from 'react-router-dom'
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'
import Checkout from './container/checkout/checkout'
import Orders from './container/Orders/orders'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>      
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/" exact component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
