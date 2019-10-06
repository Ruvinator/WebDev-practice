import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import AuxComp from '../../../hoc/AuxComp'
import styles from './SideDrawer.module.css';

const sideDrawer = props => {
    let attachedStyles = [styles.SideDrawer, styles.Close]
    if (props.open) {
        attachedStyles = [styles.SideDrawer, styles.Open]
    }

    return (
        <AuxComp>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedStyles.join(" ")}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </AuxComp>
    );
};

export default sideDrawer;