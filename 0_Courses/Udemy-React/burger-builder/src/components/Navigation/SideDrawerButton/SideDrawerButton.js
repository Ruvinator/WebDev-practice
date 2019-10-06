import React from 'react';
import styles from './SideDrawerButton.module.css';

const sideDrawerButton = props => (
    <button className={styles.SideDrawerButton} onClick={props.clicked}>MENU</button>
);

export default sideDrawerButton;