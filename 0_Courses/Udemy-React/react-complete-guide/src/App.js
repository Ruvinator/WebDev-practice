import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  state = {
    persons: [
      { name: "Igor", age: 25 },
      { name: "Bilz", age: 28 },
      { name: "Dilz", age: 26 }
    ]
  }

  // Handlers are added to names of functions assigned as event handlers
  switchNameHandler = () => {
    // DON'T DO THIS: this.state.persons[0].name="Igorillian";

    // Updates values matching property names
    // In this case, "Igor" will be updated to "Igorillian" and "Bilz" age to 21
    this.setState({
      persons: [
        { name: "Igorillian", age: 25 },
        { name: "Bilz", age: 21 },
        { name: "Dilz", age: 26 }
      ]
    });
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: "Igor", age: 25 },
        { name: event.target.value, age: 31 },  // Gets value we typed into input field
        { name: "Dilz", age: 26 }
      ]
    });
  }

  // Component must have render method to render/return HTML to DOM
  render() {
    // Can add inline styles
    // CSS 
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    };

    return (
      // Code below is not HTML, it's JSX (syntactical sugar)
      // Compiled to code shown below
      <div className="App">
        <h1>Hi, I'm a react app!</h1>
        <p>This is really working.</p>

        {/* Call handler function when button is clicked */}
        <button
          style={style}
          onClick={this.switchNameHandler}>Switch Name</button>

        {/* Import custom component */}
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age} />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          changed={this.nameChangedHandler} />
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age} />
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
