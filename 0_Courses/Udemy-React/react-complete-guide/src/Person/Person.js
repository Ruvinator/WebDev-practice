import React from 'react';
import './Person.css';

// Instead of making class extending Component, can make a regular function
const person = (props) => {
    return (
        <div className="Person">
            {/* Inline dynamic (JS) content must be wrapped in {} */}
            <p>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            {/* Allows us to change name dynamically and check current state (two-way binding) */}
            <input type="text" onChange={props.changed} value={props.name}></input>
        </div>
    );

};

// Export default so that it can be imported in another file
export default person;