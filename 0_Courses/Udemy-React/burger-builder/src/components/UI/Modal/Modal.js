import React from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import AuxComp from '../../../hoc/AuxComp';

const modal = props => (
    <AuxComp>
        <div
            className={styles.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? 1 : 0
            }}>
            {props.children}
        </div>
        <Backdrop show={props.show} clicked={props.modalClosed} />
    </AuxComp>
);

export default modal;