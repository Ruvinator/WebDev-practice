import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.module.css';

const controls = [
    { label: 'Lettuce', type: 'lettuce'},
    { label: 'Bacon',   type: 'bacon'},
    { label: 'Cheese',  type: 'cheese'},
    { label: 'Patty',   type: 'patty'},
]

const BuildControls = props => (
    <div className={styles.buildControls}>
        <p>Current price: <strong>${props.price}</strong></p>
        {controls.map(ctrl => (
            <BuildControl key={ctrl.label} 
                          label={ctrl.label}
                          added={() => props.ingredientAdded(ctrl.type)}
                          removed={() => props.ingredientRemoved(ctrl.type)}
                          disabled={props.disabled[ctrl.type]} />
        ))}
        <button 
            className={styles.OrderButton}
            disabled={!props.purchaseable}
            onClick={props.ordered}>Order Now</button>
    </div>
)
export default BuildControls;