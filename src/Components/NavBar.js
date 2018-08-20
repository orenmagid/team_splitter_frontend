import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ handleSubmit, user }) => {
  const activeStyle = {
    background: "black"
  };

  const style = {
    color: "white"
  };
  return (
    <React.Fragment>
      {user ? (
        <div className="ui one item menu">
          <NavLink
            className="item"
            exact
            to="/user"
            style={style}
            activeStyle={activeStyle}
          >
            User Profile
          </NavLink>
        </div>
      ) : null}

      {user ? null : (
        <form onSubmit={handleSubmit}>
          <input name="username" type="text" />
          <input type="submit" value="Login" />
        </form>
      )}
    </React.Fragment>
  );
};

export default NavBar;
