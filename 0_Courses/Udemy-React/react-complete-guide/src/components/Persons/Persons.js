import React from 'react';
import Person from './Person/Person';
import PropTypes from 'prop-types';

const Persons = props => (
    // Use map to apply function to each array element. Also have access to index
    props.persons.map((person, index) => {
        // Key is used to more efficiently identify elements
        // Key is placed on ErrorBoundary - must always be on outermost element
        return <Person
            click={() => props.clicked(index)}
            name={person.name}
            age={person.age}
            key={person.id}
            changed={(event) => props.changed(event, person.id)} />
    })
);

// Used to verify that inputs are correct data type
Person.propTypes = {
    click:   PropTypes.func,
    changed: PropTypes.func,
    name:    PropTypes.string,
    age:     PropTypes.number
};

export default Persons;