import React from 'react';
import './UserInput.css'

const UserInput = props => {
    return <input
        type="text"
        onChange={props.eventHandler}
        value={props.username}
        className="userInput"/>
}

export default UserInput;