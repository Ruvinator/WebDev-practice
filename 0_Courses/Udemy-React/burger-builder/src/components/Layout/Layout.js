import React, { Component } from 'react';
import AuxComp from '../../hoc/AuxComp';
import Toolbar from '../Navigation/Toolbar/Toobar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import styles from './Layout.module.css';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerOpenedHandler = () => {
        this.setState({showSideDrawer: true});
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    render() {
        return (
            <AuxComp>
                <Toolbar sideDrawerButtonClicked={this.sideDrawerOpenedHandler} />
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                <div>Toolbar, SideDrawer, Backdrop</div>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </AuxComp >
        );
    }

};

export default Layout;