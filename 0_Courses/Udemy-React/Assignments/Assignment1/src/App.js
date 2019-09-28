import React, { Component } from 'react';
import './App.css';
import UserInput  from './UserInput/UserInput'
import UserOutput from './UserOutput/UserOutput'

class App extends Component {
  state = {
    userOutputs: [
      { username: "Igor" },
      { username: "Rogi" },
      { username: "Gori" }
    ]
  }

  eventHandler = (event) => {
    this.setState({
      userOutputs: [
        { username: event.target.value },
        { username: "Hard coded :(" },
        { username: "Hard coded x2 :(" }
      ]
    });
  }

  render() {
    return (
      <div className="App">
        <ol>
          <UserInput  username={this.state.userOutputs[0].username} eventHandler={this.eventHandler} />
          <UserOutput username={this.state.userOutputs[0].username} />
          <UserOutput username={this.state.userOutputs[1].username} />
          <UserOutput username={this.state.userOutputs[2].username} />
        </ol>
      </div>
    );
  }
}

export default App;
