import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class GroupCard extends Component {
  state = {
    users: []
  };

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  handleAddToGroupSubmit = e => {
    e.preventDefault();

    let username = e.target.username.value;
    e.target.reset();
    let data = {
      username: username
    };

    fetch(
      `https://limitless-bayou-72938.herokuapp.com/api/v1/groups/${
        this.props.group.id
      }`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(jsonData => {
        let uniqueUsers = this.removeDuplicates(jsonData.users, "id");
        this.setState({
          users: uniqueUsers
        });
      });
  };

  componentDidMount() {
    fetch(
      `https://limitless-bayou-72938.herokuapp.com/api/v1/groups/${
        this.props.group.id
      }`
    )
      .then(res => res.json())
      .then(jsonData => {
        let uniqueUsers = this.removeDuplicates(jsonData.users, "id");
        this.setState({
          users: uniqueUsers
        });
      });
  }

  render() {
    const {
      group,
      handleMakeClick,
      handleShowClick,
      currentUser,
      handleLeaveGroup
    } = this.props;

    return (
      <React.Fragment>
        <div className="card">
          <div>
            <button
              onClick={() => handleLeaveGroup(group, currentUser)}
              className="ui left floated circular secondary basic button"
            >
              Leave Group
            </button>
          </div>
          <div className="content">
            <div className="header"> Group: {group.name}</div>
            <div className="meta">Group id: {group.id}</div>
            <div className="description" />
            <div className="ui mini horizontal divided list">
              {this.state.users.map(user => {
                return (
                  <div key={user.id} className="item">
                    <i className="ui avatar basketball ball icon" />

                    <div className="content">
                      <div className="header">{user.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="extra content" />
          <Link to={`/makecomparisons`}>
            <button
              onClick={() => handleMakeClick(group, this.state.users)}
              className="ui secondary basic button"
            >
              Make Comparisons
            </button>
          </Link>
          <Link to={`/showcomparisons`}>
            <button
              onClick={() => handleShowClick(group, this.state.users)}
              className="ui secondary basic button"
            >
              Show Comparisons
            </button>
          </Link>
          <div className="ui divider" />

          <form className="ui form" onSubmit={this.handleAddToGroupSubmit}>
            <div className="field">
              <label>Add User By Username</label>
              <input type="text" name="username" placeholder="username" />
            </div>

            <button type="submit" className="ui secondary basic button">
              Add User
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
