import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerButton from '../SideDrawerButton/SideDrawerButton';

const toolbar = props => (
    <header className={styles.Toolbar}>
        <div className={styles.SideDrawerButton}>
            <SideDrawerButton clicked={props.sideDrawerButtonClicked} />
        </div>
        <div className={styles.Logo}>
            <Logo />
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;