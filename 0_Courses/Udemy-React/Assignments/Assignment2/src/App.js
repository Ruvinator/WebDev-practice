import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {

  state = {
    charComponents: [],
    textLength: 0,
    textContent: ""
  };

  inputChangeListener = (event) => {
    const textContent = event.target.value;
    const textLength = event.target.value.length;

    const charComponents = [];
    for (let i = 0; i < textLength; i++) {
      const tempCharComponent = { letter: textContent[i] };
      charComponents.push(tempCharComponent);
    }

    this.setState({
      charComponents: charComponents,
      textLength: textLength,
      textContent: textContent
    });
  };


  deleteCharListener = (event, index) => {
    const charComponents = [...this.state.charComponents];
    const textContentSplit = this.state.textContent.split('');

    charComponents.splice(index, 1);
    textContentSplit.splice(index, 1);

    const textContent = textContentSplit.join('');

    this.setState({
      charComponents: charComponents,
      textContent: textContent,
      textLength: textContent.length
    })
  };

  render() {

    return (
      <div className="App">
        <input
          type="text"
          onChange={this.inputChangeListener}
          value={this.state.textContent} />
        <ValidationComponent
          value={this.state.textLength} />

        {
          this.state.charComponents.map((sc, idx) => {
            return (
              <CharComponent
                letter={sc.letter}
                clicked={this.deleteCharListener} />
            )
          })
        }

        {/* Add list of CharComponents here */}
      </div>
    );
  }
}

export default App;
