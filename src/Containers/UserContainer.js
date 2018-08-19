import React, { Component } from "react";
import GroupCard from "../Components/GroupCard";
import MakeComparisonsContainer from "./MakeComparisonsContainer";
import ShowComparisonsContainer from "./ShowComparisonsContainer";

export default class UserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNbaPlayers: false,
      user: null,
      currentGroup: null,
      usersInCurrentGroup: [],
      currentGroupComparisons: [],
      newGroupName: ""
    };
  }

  handleMakeClick = (group, users) => {
    this.setState({
      showNbaPlayers: true,
      currentGroup: group,
      usersInCurrentGroup: users,
      newGroupName: "",
      showExistingComparisons: false,
      currentComparisons: []
    });
  };

  handleShowClick = (group, users) => {
    this.setState({
      showNbaPlayers: false,
      currentGroup: group,
      usersInCurrentGroup: users,
      showExistingComparisons: true
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
  handleGroupNameChange = e => {
    let newGroupName = e.target.value;
    this.setState({
      newGroupName: newGroupName
    });
  };

  handleNewGroupSubmit = e => {
    e.target.reset();
    e.preventDefault();

    let newGroupName = this.state.newGroupName;

    let data = {
      name: newGroupName,
      user_id: this.props.user.id
    };

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

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  render() {
    let user = this.state.user ? this.state.user : this.props.user;
    console.log("user", user);
    if (user !== null) {
      return (
        <div className="ui container">
          <h2>Welcome, {user.name}!</h2>
          <div className="ui cards">
            {this.removeDuplicates(user.groups, "id").map(group => (
              <GroupCard
                key={group.id}
                group={group}
                handleMakeClick={this.handleMakeClick}
                handleShowClick={this.handleShowClick}
              />
            ))}

            <div className="card">
              <div className="content">
                <div className="header"> Create New Group</div>
                <div className="meta" />
                <div className="description" />
              </div>

              <form className="ui form" onSubmit={this.handleNewGroupSubmit}>
                <div className="field">
                  <label>Group Name</label>
                  <input
                    onChange={this.handleGroupNameChange}
                    type="text"
                    name="groupname"
                    placeholder="Group Name"
                  />
                </div>

                <button type="submit" className="ui secondary basic button">
                  <i className=" plus circle icon" />
                </button>
              </form>
            </div>
          </div>
          {this.state.showNbaPlayers ? (
            <MakeComparisonsContainer
              group={this.state.currentGroup}
              users={this.state.usersInCurrentGroup}
              handleSelect={this.handleSelect}
              currentUser={user}
            />
          ) : null}
          {this.state.showExistingComparisons ? (
            <ShowComparisonsContainer
              group={this.state.currentGroup}
              comparisons={this.state.currentGroupComparisons}
              users={this.state.usersInCurrentGroup}
              currentUser={user}
            />
          ) : null}
        </div>
      );
    }
    return <div />;
  }
}
