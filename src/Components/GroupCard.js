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

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/groups/${this.props.group.id}`)
      .then(res => res.json())
      .then(jsonData => {
        let uniqueUsers = this.removeDuplicates(jsonData.users, "id");
        this.setState({
          users: uniqueUsers
        });
      });
  }

  render() {
    const { group, handleClick } = this.props;

    return (
      <React.Fragment>
        <div className="card">
          <div className="content">
            <div className="header"> Group: {group.name}</div>
            <div className="meta" />
            <div className="description" />
            <ul>
              {this.state.users.map(user => {
                return (
                  <li key={user.id}>
                    Name: {user.name}, Age: {user.age}, Height: {user.height}{" "}
                    Inches
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="extra content" />
          <button
            onClick={() => handleClick(group, this.state.users)}
            className="ui basic button"
          >
            Make Comparsons
          </button>
        </div>
      </React.Fragment>
    );
  }
}
