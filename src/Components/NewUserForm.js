import React, { Component } from "react";

import { Redirect } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    let { user, handleCreateUser, displayNewUserForm } = this.props;

    if (!displayNewUserForm && !user) {
      return <Redirect to="/" />;
    }
    return (
      <div className="ui container">
        <form className="ui form top-margin" onSubmit={handleCreateUser}>
          <div className="field">
            <label>UserName</label>
            <input type="text" name="username" placeholder="username" />
          </div>
          {/* <div className="field">
          <label>Password</label>
          <input type="text" name="password" placeholder="password" />
        </div> */}
          <div className="field">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name" />
          </div>
          <div className="field">
            <label>Height in Inches</label>
            <input type="number" name="height" placeholder="Height" />
          </div>
          <div className="field">
            <label>Age</label>
            <input type="number" name="age" placeholder="Age" />
          </div>

          <button className="ui secondary basic button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
