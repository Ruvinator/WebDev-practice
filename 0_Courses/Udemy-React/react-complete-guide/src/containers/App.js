import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import styles from './App.css';

class App extends Component {
  state = {
    persons: [
      { id: 'qwer', name: "Igor", age: 25 },
      { id: 'asdf', name: "Bilz", age: 28 },
      { id: 'zxcv', name: "Dilz", age: 26 }
    ],
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // Spreading to copy properties/elements
    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];  // Copy array elems using spread (don't pass as reference)
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    this.showPersons = !this.showPersons;
    this.setState({ showPersons: this.showPersons });
  }

  // Component must have render method to render/return HTML to DOM
  render() {
    // Logic below to toggle whether persons will be visible
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} />
    }

    return (
      // Code below is not HTML, it's JSX (syntactical sugar)
      // Compiled to code shown below
      <div className={styles.App}>  {/* Refers to CSS class and applies its styles */}

        <Cockpit
          persons={this.state.persons}
          showPersons={this.state.showPersons}
          buttonPressed={this.togglePersonsHandler}
        />
        {/* Outputting persons variable from below (with visibility logic) */}
        {persons}
      </div>
    );
  }
}

export default App;
