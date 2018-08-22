import React, { Component } from "react";
import { Route } from "react-router-dom";

import MakeComparisonsContainer from "./Containers/MakeComparisonsContainer";
import ShowComparisonsContainer from "./Containers/ShowComparisonsContainer";
import NavBar from "./Components/NavBar";
import NewUserForm from "./Components/NewUserForm";
import UserContainer from "./Containers/UserContainer";

import "./App.css";

class App extends Component {
  state = {
    user: null,
    username: "",
    displayNewUserForm: false,
    currentGroup: null,
    usersInCurrentGroup: [],
    currentGroupComparisons: []
  };
  //-----------------User Login and Logout Functionality-----------------//
  handleSubmit = e => {
    e.preventDefault();
    const username = e.currentTarget.username.value;
    this.getUser(username);
    this.setState({
      displayNewUserForm: false
    });
  };

  getUser = username => {
    fetch(`https://limitless-bayou-72938.herokuapp.com//api/v1/users`)
      .then(response => response.json())
      .then(users => {
        this.checkForExistingUser(users, username);
      });
  };

  checkForExistingUser = (users, username) => {
    const user = users.find(user => user.username === username);

    if (user === undefined) {
      this.setState({
        username: username
      });
      alert("Username not found. Please try again, or create a new account.");
    } else {
      this.setState({
        user: user,
        username: username
      });
    }
  };

  handleLogout = () => {
    this.setState({
      user: null,
      username: ""
    });
  };
  //-------------------Create New User Functionality------------------//
  createNewUser = username => {
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
        if (jsonData.errors.length !== 0) {
          this.displayErrors(jsonData.errors);
        } else {
          this.setState({
            user: jsonData,
            displayNewUserForm: false
          });
          window.history.back();
        }
      });
  };

  displayErrors = errors => {
    let errorlist = errors.map(error => {
      return `-${error} \n`;
    });
    alert(errorlist.join(" "));
  };

  //-----------------Handles Make And Show Comparisons Functionality--------------//
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
  //-----------------Handles Group Functionality-----------------//
  handleJoinGroupSubmit = e => {
    e.preventDefault();
    let groupName = e.target.groupname.value;
    let groupId = e.target.groupid.value;
    e.target.reset();
    let data = {
      name: groupName,
      id: groupId,
      user_id: this.state.user.id
    };

    fetch(
      `https://limitless-bayou-72938.herokuapp.com/api/v1/groups/${groupId}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(jsonData => this.getUpdatedUserInfo(this.state.user));
  };

  handleNewGroupSubmit = e => {
    e.preventDefault();

    let newGroupName = e.target.groupname.value;
    let data = {
      name: newGroupName,
      user_id: this.state.user.id
    };
    e.target.reset();
    fetch(`https://limitless-bayou-72938.herokuapp.com/api/v1/groups`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(jsonData => this.getUpdatedUserInfo(jsonData.users[0]));
  };

  handleLeaveGroup = (group, user) => {
    let userGroup = user.user_groups.find(
      user_group => user_group.group_id === group.id
    );

    fetch(
      `https://limitless-bayou-72938.herokuapp.com/api/v1/user_groups/${
        userGroup.id
      }`,
      {
        method: "DELETE"
      }
    ).then(() => this.getUpdatedUserInfo(user));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavBar
            username={this.state.username}
            displayNewUserForm={this.state.displayNewUserForm}
            createNewUser={this.createNewUser}
            user={this.state.user}
            handleSubmit={this.handleSubmit}
            handleLogout={this.handleLogout}
          />
        </header>
        <div>
          {this.state.user || this.state.displayNewUserForm ? null : (
            <React.Fragment>
              <h1 className="">Team Splitter</h1>
              <img
                className="ui centered middle aligned large image"
                src="../noun_Basketball_1671463.svg"
                alt="basketball-player-dunking"
              />
            </React.Fragment>
          )}

          <Route
            exact
            path="/newuser"
            render={routerProps => (
              <NewUserForm
                handleCreateUser={this.handleCreateUser}
                username={this.state.username}
                displayNewUserForm={this.state.displayNewUserForm}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={routerProps => (
              <UserContainer
                {...routerProps}
                handleJoinGroupSubmit={this.handleJoinGroupSubmit}
                handleNewGroupSubmit={this.handleNewGroupSubmit}
                handleLeaveGroup={this.handleLeaveGroup}
                handleUserInfoUpdate={this.getUpdatedUserInfo}
                user={this.state.user}
                handleMakeClick={this.handleMakeClick}
                handleShowClick={this.handleShowClick}
              />
            )}
          />

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
