import React, { Component } from "react";
import GroupCard from "../Components/GroupCard";
import MakeComparisonsContainer from "./MakeComparisonsContainer";
import ShowComparisonsContainer from "./ShowComparisonsContainer";

export default class UserContainer extends Component {
  state = {
    showNbaPlayers: false,
    currentGroup: null,
    usersInCurrentGroup: [],
    showExistingComparisons: false,

  };

  handleMakeClick = (group, users) => {
    this.setState({
      showNbaPlayers: true,
      currentGroup: group,
      usersInCurrentGroup: users,
      showExistingComparisons: false,
      currentComparisons: []
    });
  };

  handleShowClick = (group, users) => {
    this.setState({
      showNbaPlayers: false,
      usersInCurrentGroup: users,
      showExistingComparisons: true
    });

    this.fetchGroupForComparisons(group)
  };

  fetchGroupForComparisons = (group) => {
    console.log(group.id)
    fetch(`http://localhost:3000/api/v1/groups/${group.id}`)
    .then(response => response.json())
    .then(groupData => {
      this.setState({
        currentGroup: groupData
      })
    })
  }


  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }



  render() {
    if (this.props.user !== null) {
      return (
        <div className="ui container">
          <h2>Welcome, {this.props.user.name}!</h2>
          <div className="ui cards">
            {this.removeDuplicates(this.props.user.groups, "id").map(group => (
              <GroupCard
                key={group.id}
                group={group}
                handleMakeClick={this.handleMakeClick}
                handleShowClick={this.handleShowClick}
              />
            ))}
          </div>
          {this.state.showNbaPlayers ? (
            <MakeComparisonsContainer
              group={this.state.currentGroup}
              users={this.state.usersInCurrentGroup}
              handleSelect={this.handleSelect}
              currentUser={this.props.user}
            />
          ) : null}
          {this.state.showExistingComparisons ? (
          <ShowComparisonsContainer 
            group={this.state.currentGroup}
            users={this.state.usersInCurrentGroup}
            currentUser={this.props.user}
            />) : null}
        </div>
      );
    }
    return <div />;
  }
}
