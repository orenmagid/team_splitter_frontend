import React, { Component } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import MakeComparisonsContainer from "./Containers/MakeComparisonsContainer";
import ShowComparisonsContainer from "./Containers/ShowComparisonsContainer";
import NavBar from "./Components/NavBar";
import NewUserForm from "./Components/NewUserForm";
import UserContainer from "./Containers/UserContainer";

import "./App.css";

class App extends Component {
  state = {
    user: null,
    displayNewUserForm: false,
    username: "",
    currentGroup: null,
    usersInCurrentGroup: [],
    currentGroupComparisons: []
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("Inside handleSubmit");
    const username = e.currentTarget.username.value;
    this.getUser(username);
  };

  getUser = username => {
    console.log("Inside getUser");
    fetch(`https://limitless-bayou-72938.herokuapp.com//api/v1/users`)
      .then(response => response.json())
      .then(users => {
        this.checkForExistingUser(users, username);
      });
  };

  checkForExistingUser = (users, username) => {
    console.log("Inside checkForExistingUser");
    console.log(users);
    const user = users.find(user => user.username === username);

    if (user === undefined) {
      this.setState({
        username: username
      });
      this.createNewUser(username);
    } else {
      this.setState({
        user: user,
        username: username
      });
    }
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
      // password: e.currentTarget.password.value,
      name: e.currentTarget.name.value,
      height: e.currentTarget.height.value,
      age: e.currentTarget.age.value
    };

    fetch(`https://limitless-bayou-72938.herokuapp.com/api/v1/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(jsonData => {
        console.log(jsonData);
        this.setState({
          user: jsonData,
          displayNewUserForm: false
        });
      });
  };

  handleMakeClick = (group, users) => {
    this.setState({
      currentGroup: group,
      usersInCurrentGroup: users,
      newGroupName: "",
      showExistingComparisons: false,
      currentComparisons: []
    });
  };

  getUpdatedUserInfo = user => {
    console.log(user.name);
    fetch(
      `https://limitless-bayou-72938.herokuapp.com//api/v1/users/${user.id}`
    )
      .then(response => response.json())
      .then(user => {
        this.setState({
          user: user
        });
      });
  };

  handleShowClick = (group, users) => {
    this.setState({
      currentGroup: group,
      usersInCurrentGroup: users
    });

    this.fetchGroupForComparisons(group);
  };

  fetchGroupForComparisons = group => {
    console.log(group.id);
    fetch(`https://limitless-bayou-72938.herokuapp.com/api/v1/comparisons`)
      .then(response => response.json())
      .then(comparisonsData => {
        let currentGroupComparisons = comparisonsData.filter(comparison => {
          return comparison.group_id === group.id;
        });
        this.setState({
          currentGroupComparisons: currentGroupComparisons
        });
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavBar user={this.state.user} handleSubmit={this.handleSubmit} />
        </header>
        <div>
          {this.state.displayNewUserForm ? (
            <NewUserForm
              username={this.state.username}
              handleCreateUser={this.handleCreateUser}
            />
          ) : (
            <Route
              exact
              path="/"
              render={routerProps => (
                <UserContainer
                  {...routerProps}
                  handleUserInfoUpdate={this.getUpdatedUserInfo}
                  user={this.state.user}
                  handleMakeClick={this.handleMakeClick}
                  handleShowClick={this.handleShowClick}
                />
              )}
            />
          )}
          <Route
            exact
            path="/makecomparisons"
            render={routerProps => (
              <MakeComparisonsContainer
                {...routerProps}
                group={this.state.currentGroup}
                users={this.state.usersInCurrentGroup}
                currentUser={this.state.user}
                handleUserInfoUpdate={this.getUpdatedUserInfo}
              />
            )}
          />

          <Route
            exact
            path="/showcomparisons"
            render={routerProps => (
              <ShowComparisonsContainer
                {...routerProps}
                group={this.state.currentGroup}
                users={this.state.usersInCurrentGroup}
                comparisons={this.state.currentGroupComparisons}
                currentUser={this.state.user}
                handleShowClick={this.handleShowClick}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default App;
