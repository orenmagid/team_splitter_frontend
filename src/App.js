import React, { Component } from "react";
import PlayerList from "./Containers/PlayerList";

import "./App.css";

class App extends Component {
  state = {
    allNbaPlayers: []
  };
  componentDidMount() {
    fetch("http://localhost:3000/api/v1/nba_players")
      .then(res => res.json())
      .then(jsonData => {
        // console.log(jsonData);
        this.setState({
          allNbaPlayers: jsonData
        });
      });
  }

  // pieUtility = () => {
  //   let allNbaPlayers = this.state.allNbaPlayers;
  //   allNbaPlayers.
  //
  // };

  render() {
    return (
      <div className="App ">
        <header className="App-header">
          <div className="ui inverted segment">
            <div className="ui inverted secondary pointing menu" />
          </div>
        </header>
        <PlayerList players={this.state.allNbaPlayers} />
      </div>
    );
  }
}

export default App;
