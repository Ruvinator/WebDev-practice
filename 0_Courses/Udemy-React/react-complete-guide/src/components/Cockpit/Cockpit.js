import React from 'react';
import styles from './Cockpit.css';

const Cockpit = props => {

    let btnClass = '';

    // Define classes for dynamic assignment
    const classes = [];

    if(props.showPersons) {
      btnClass = styles.Red;
    }

    if (props.personsLength <= 2) {
      classes.push(styles.red);
    }
    if (props.personsLength <= 1) {
      classes.push(styles.bold);
    }

    return (
        <div className={styles.Cockpit}>
            <h1>{props.title}</h1>
            <p className={classes.join(" ")}>This is really working.</p>

            {/* Call handler function when button is clicked */}
            <button
                style={props.styles}
                onClick={props.buttonPressed}
                className={btnClass}>Switch Name</button>
        </div>
    );
};

export default Cockpit;