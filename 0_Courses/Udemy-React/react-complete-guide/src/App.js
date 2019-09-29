import React, { Component } from 'react';
import Person from './Person/Person'
import styles from './App.module.css';

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
    // Can add inline styles
    // CSS 
    const style = {
      backgroundColor: "green",
      color: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    };

    // Logic below to toggle whether persons will be visible
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {/* Use map to apply function to each array element. Also have access to index */}
          {
            this.state.persons.map((person, index) => {
              return <Person
                click={this.deletePersonHandler}
                name={person.name}
                age={person.age}
                key={person.id}
                change={(event) => this.nameChangedHandler(event, person.id)} />  // Key is used to identify elements (efficiency)
            })
          }
        </div>
      );

      // Dynamically changing background color to red when entries are visible
      style.backgroundColor = "red";
    }

    // Define classes for dynamic assignment
    const classes = [];

    if (this.state.persons.length <= 2) {
      classes.push( styles.red );
    }
    if (this.state.persons.length <= 1) {
      classes.push( styles.bold );
    }

    return (
        // Code below is not HTML, it's JSX (syntactical sugar)
        // Compiled to code shown below
        <div className={styles.App}>  {/* Refers to CSS class and applies its styles */}
          <h1>Hi, I'm a react app!</h1>
          <p className={classes.join(" ")}>This is really working.</p>

          {/* Call handler function when button is clicked */}
          <button
            style={style}
            onClick={this.togglePersonsHandler}>Switch Name</button>

          {/* Outputting persons variable from below (with visibility logic) */}
          {persons}
        </div>
    );

    // Code above with explicit HTML is same as code below using createElement()
    // Calling createElement() for each element is cumbersome, so above is preferred

    // Takes (at least) 3 elements: 1  HTML element/React component rendered
    //                              2  Configuration (classes, etc.)
    //                              3+ Children elements
    // Need to call createElement for every element created (ex. children)
    return React.createElement("div", { className: "App" }, React.createElement("h1", null, "Hi, I\'m a React App!!!"));
  }
}

export default App;
