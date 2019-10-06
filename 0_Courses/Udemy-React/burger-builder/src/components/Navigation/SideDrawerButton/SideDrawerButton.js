import React from 'react';
import styles from './SideDrawerButton.module.css';

const sideDrawerButton = props => (
    <div className={styles.SideDrawerButton} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default sideDrawerButton;