import React, { Component } from "react";
import PlayerList from "./Containers/PlayerList";
import NavBar from "./Components/NavBar";
import User from "./Components/User";

import "./App.css";

class App extends Component {
  state = {
    allNbaPlayers: [],
    user: null,
    displayNewUserForm: false,
    username: ""
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

  handleSubmit = e => {
    e.preventDefault();
    console.log("Inside handleSubmit");
    const username = e.currentTarget.username.value;
    this.getUser(username);
  };

  getUser = username => {
    console.log("Inside getUser");
    fetch(`http://localhost:3000/api/v1/users`)
      .then(response => response.json())
      .then(users => {
        this.checkForExistingUser(users, username);
      });
  };

  checkForExistingUser = (users, username) => {
    console.log("Inside checkForExistingUser");
    users.forEach(user => {
      if (user.username === username) {
        this.setState({
          user: user,
          username: username
        });
      } else {
        this.setState({
          username: username
        });
        this.createNewUser(username);
      }
    });
  };
  createNewUser = username => {
    console.log("Inside createNewUser");
    this.setState({
      displayNewUserForm: true
    });
  };

  handleCreateUser = e => {
    e.preventDefault();
    let data = {
      username: e.currentTarget.username.value,
      name: e.currentTarget.name.value,
      height: e.currentTarget.height.value,
      age: e.currentTarget.age.value
    };

    fetch(`http://localhost:3000/api/v1/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(jsonData =>
        this.setState({
          user: jsonData,
          displayNewUserForm: false
        })
      );
  };

  render() {
    return (
      <div className="App ">
        <header className="App-header">
          <div className="ui inverted segment">
            <div className="ui inverted secondary pointing menu" />
          </div>
          <NavBar user={this.state.user} handleSubmit={this.handleSubmit} />
        </header>
        <User
          displayNewUserForm={this.state.displayNewUserForm}
          user={this.state.user}
          username={this.state.username}
          handleCreateUser={this.handleCreateUser}
        />

        <PlayerList players={this.state.allNbaPlayers} />
      </div>
    );
  }
}

export default App;
