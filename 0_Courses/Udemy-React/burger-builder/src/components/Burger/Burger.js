import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bun-top" />
            <BurgerIngredient type="bacon" />
            <BurgerIngredient type="patty" />
            <BurgerIngredient type="cheese" />
            <BurgerIngredient type="lettuce" />
            <BurgerIngredient type="bun-bottom" />
        </div>
    );
}

export default burger;