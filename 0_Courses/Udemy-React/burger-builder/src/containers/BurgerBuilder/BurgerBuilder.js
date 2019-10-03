import React, { Component } from 'react';
import AuxComp from '../../hoc/AuxComp';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        }
    }

    render () {
        return (
            <AuxComp>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls />
            </AuxComp>
        );
    }
}

export default BurgerBuilder;