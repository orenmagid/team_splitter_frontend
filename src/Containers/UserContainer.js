import React, { Component } from "react";
// import { Route, Link } from "react-router-dom";
import GroupCard from "../Components/GroupCard";

export default class UserContainer extends Component {
  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  render() {
    let user = this.props.user;
    console.log("user", user);
    if (user !== null) {
      return (
        <div className="ui container">
          <h2>Welcome, {user.name}!</h2>
          <div className="ui three doubling stackable cards">
            <div className="card">
              <div className="image">
                <img src="../noun_basketball_player_1646799-transparent-background.svg" />
              </div>
              <div className="content">
                <div className="header"> Create New Group</div>
                <div className="meta" />
                <div className="description" />
              </div>

              <form
                className="ui form"
                onSubmit={this.props.handleNewGroupSubmit}
              >
                <div className="field">
                  <label>Group Name</label>
                  <input
                    type="text"
                    name="groupname"
                    placeholder="Group Name"
                  />
                </div>

                <button type="submit" className="ui secondary basic button">
                  Create Group
                </button>
              </form>
            </div>

            <div className="card">
              <div className="image rounded">
                <img src="../noun_Basketball_1671463-round-white-background.svg" />
              </div>
              <div className="content">
                <div className="header"> Join a Group</div>
                <div className="meta" />
                <div className="description" />
              </div>

              <form
                className="ui form"
                onSubmit={this.props.handleJoinGroupSubmit}
              >
                <div className="field">
                  <label>Group Name</label>
                  <input
                    type="text"
                    name="groupname"
                    placeholder="Group Name"
                  />
                  <label>Group ID</label>
                  <input type="number" name="groupid" placeholder="Group Id" />
                </div>

                <button type="submit" className="ui secondary basic button">
                  Join Group
                </button>
              </form>
            </div>
            {this.removeDuplicates(user.groups, "id").map(group => (
              <GroupCard
                key={group.id}
                group={group}
                handleMakeClick={this.props.handleMakeClick}
                handleShowClick={this.props.handleShowClick}
                handleUserInfoUpdate={this.props.handleUserInfoUpdate}
                handleLeaveGroup={this.props.handleLeaveGroup}
                currentUser={user}
              />
            ))}
          </div>
        </div>
      );
    }
    return <div />;
  }
}
