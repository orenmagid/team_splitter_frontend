import React, { Component } from "react";

export default class NavBar extends Component {
  render() {
    const { handleSubmit, user } = this.props;
    return (
      <React.Fragment>
        {user ? null : (
          <form onSubmit={handleSubmit}>
            <input name="username" type="text" />
            <input type="submit" />
          </form>
        )}
      </React.Fragment>
    );
  }
}
