import React from 'react';
import AuxComp from '../../hoc/AuxComp';
import Toolbar from '../Navigation/Toolbar/Toobar';

import styles from './Layout.module.css';

const layout = props => (
    <AuxComp>
        <Toolbar />
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={styles.Content}>
            {props.children}
        </main>
    </AuxComp>
);

export default layout;