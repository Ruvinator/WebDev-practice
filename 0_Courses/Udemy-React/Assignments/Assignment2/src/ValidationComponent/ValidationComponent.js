import React from 'react';

const ValidationComponent = props => {
    return <p>{props.value < 5 ? "Text too short." : "Text long enough."}</p>
}

export default ValidationComponent;