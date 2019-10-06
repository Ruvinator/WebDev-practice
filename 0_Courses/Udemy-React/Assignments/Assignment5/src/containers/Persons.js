import React, { Component } from 'react';
import { connect } from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import * as actionTypes from '../store/actions';

class Persons extends Component {

    render() {
        return (
            <div>
                <AddPerson personAdded={this.props.onPersonAdded} />
                {this.props.persons.map(person => (
                    <Person
                        key={person.id}
                        name={person.name}
                        age={person.age}
                        clicked={() => this.props.onPersonDeleted(person.id)} />
                ))}
            </div>
        );
    }
}

// States we want to get
const mapStateToProps = state => {
    return {
        persons: state.persons
    }
}

// Actions to dispatch
const mapDispatchToProps = dispatch => {
    return {
        onPersonAdded:     () => dispatch({ type: actionTypes.ADDED }),
        onPersonDeleted: (id) => dispatch({ type: actionTypes.DELETED, deletedId: id })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);