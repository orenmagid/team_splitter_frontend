import React, { Component } from "react";

import "./App.css";

class App extends Component {
  componentDidMount() {
    fetch("http://localhost:3000/api/v1/nba_players")
      .then(res => res.json())
      .then(jsonData => console.log(jsonData));
  }

  render() {
    return (
      <div className="App ">
        <header className="App-header">
          <div className="ui inverted segment">
            <div className="ui inverted secondary pointing menu" />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
