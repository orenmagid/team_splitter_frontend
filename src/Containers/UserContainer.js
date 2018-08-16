import React, { Component } from "react";
import GroupCard from "../Components/GroupCard";
import ComparisonsContainer from "./ComparisonsContainer";

export default class UserContainer extends Component {
  state = {
    showComparisons: false,
    currentGroup: null,
    usersInCurrentGroup: [],
    selectedUser: ""
  };

  handleClick = (group, users) => {
    this.setState({
      showComparisons: true,
      currentGroup: group,
      usersInCurrentGroup: users
    });
  };

  handleSelect = event => {
    let currentUser = this.state.usersInCurrentGroup.find(user => {
      return user.id === parseInt(event.target.value);
    });
    console.log(currentUser);
    this.setState({
      selectedUser: currentUser
    });
  };

  render() {
    if (this.props.user !== null) {
      return (
        <div>
          <h2>Welcome, {this.props.user.name}!</h2>
          <div className="ui cards">
            {this.props.user.groups.map(group => (
              <GroupCard
                key={group.id}
                group={group}
                handleClick={this.handleClick}
              />
            ))}
          </div>
          {this.state.showComparisons ? (
            <ComparisonsContainer
              group={this.state.currentGroup}
              users={this.state.usersInCurrentGroup}
              players={this.props.players}
              handleSelect={this.handleSelect}
            />
          ) : null}
        </div>
      );
    }
    return <div />;
  }
}
