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
        {controls.map(ctrl => (
            <BuildControl key={ctrl.label} label={ctrl.label} />
        ))}
    </div>
)
export default BuildControls;