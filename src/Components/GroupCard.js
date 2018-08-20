import React, { Component } from "react";

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
    e.preventDefault()

    let username = e.target.username.value
    e.target.reset()
    let data = {
      username: username
    }

    fetch(`https://limitless-bayou-72938.herokuapp.com/api/v1/groups/${
      this.props.group.id
    }`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
    .then(jsonData => {
      this.setState({
        users: jsonData.users
      })
    })
  }

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
    const { group, handleMakeClick, handleShowClick } = this.props;

    return (
      <React.Fragment>
        <div className="card">
          <div className="content">
            <div className="header"> Group: {group.name}</div>
            <div className="meta" >Group id: {group.id}</div>
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
          <form className="ui form" onSubmit={this.handleAddToGroupSubmit}>
                <div className="field">
                   <label>Add User By Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                  />
                </div>

                

                <button type="submit" className="ui secondary basic button">
                  <i className=" plus circle icon" />
                </button>
              </form>
          <button
            onClick={() => handleMakeClick(group, this.state.users)}
            className="ui secondary basic button"
          >
            Make Comparisons
          </button>
          <button
            onClick={() => handleShowClick(group, this.state.users)}
            className="ui secondary basic button"
          >
            Show Comparisons
          </button>
        </div>
      </React.Fragment>
    );
  }
}
