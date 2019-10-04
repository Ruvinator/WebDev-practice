import React, { Component } from 'react';
import AuxComp from '../../hoc/AuxComp';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// global constant typically in all caps
const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    patty: 1.3,
    bacon: 0.6
}

class BurgerBuilder extends Component {
    // Alternative method of initializing state:
    // constructor(props) {
    //     super(props);
    //     this.state={...}
    // }

    state = {
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            patty: 0
        },
        totalPrice: 5,
        purchaseable: false,
        purchasing: false
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        let updatedIngredients;
        if (oldCount > 0) {
            const updatedCount = oldCount - 1;

            updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        }
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState(updatedIngredients) {
        const ingredients = {
            ...updatedIngredients
        };
        const sum = Object.keys(ingredients)
            // Convert object to array (with map use keys to get values)
            .map(igKey => {
            return ingredients[igKey];
            })
            // Combine values into sum using reduce
            .reduce((sum, el) => {
            return sum + el;
            }, 0);
        this.setState({purchaseable: sum > 0});
    }

    // Explicitly made it arrow function to fix 'this' error
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }

    render() {
        // Disables buttons if no ingredients to remove
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <AuxComp>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice} />
                </Modal>
                
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice.toFixed(2)}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler} />
            </AuxComp>
        );
    }
}

export default BurgerBuilder;