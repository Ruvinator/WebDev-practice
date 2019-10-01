import React from 'react';
import AuxComp from '../../hoc/AuxComp';

import styles from './Layout.module.css';

const layout = props => (
    <AuxComp>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={styles.Content}>
            {props.children}
        </main>
    </AuxComp>
);

export default layout;