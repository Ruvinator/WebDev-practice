import React, { Component } from 'react';
import AuxComp from '../../hoc/AuxComp';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

// global constant typically in all caps
const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    patty: 1.3,
    bacon: 0.6
}

class BurgerBuilder extends Component {
    // Alternative method of initializing stae:
    // constructor(props) {
    //     super(props);
    //     this.state={...}
    // }

    state = {
        ingredients: {
            lettuce: 1,
            bacon: 1,
            cheese: 2,
            patty: 2
        },
        totalPrice: 7
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    }

    removeIngredientHandler = type => {

    }

    render () {
        return (
            <AuxComp>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientAdded={this.addIngredientHandler} />
            </AuxComp>
        );
    }
}

export default BurgerBuilder;