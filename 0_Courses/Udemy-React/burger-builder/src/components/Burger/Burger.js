import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
    // Object.keys() extracts keys of object and turns them into array
    let ingredientsArray = Object.keys(props.ingredients)
    .map(igKey => {
        // Create array with empty elements and return HTML for each empty elem
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            // Return burger ingredient for each value in array
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });  
    })
    // Flatten array to single dimension (from array of arrays)
    // arr and el are previous and current value. [] is initial value
    // executes callback function on every element in array
    .reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if (ingredientsArray.length === 0) {
        ingredientsArray = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bun-top" />
            {ingredientsArray}
            <BurgerIngredient type="bun-bottom" />
        </div>
    );
}

export default burger;