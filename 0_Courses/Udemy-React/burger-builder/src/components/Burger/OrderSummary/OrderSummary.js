import React from 'react';
import AuxComp from '../../../hoc/AuxComp';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (<li key={igKey}>
                        <span 
                            style={{textTransform: 'capitalize'}}>{igKey}
                        </span>: {props.ingredients[igKey]}
                    </li>);
        });
    return (
        <AuxComp>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            {ingredientSummary}
            <p><strong>Your total price is ${props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </AuxComp>
    )
};

export default orderSummary;