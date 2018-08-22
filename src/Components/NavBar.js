import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({
  handleSubmit,
  user,
  handleLogout,
  createNewUser,
  displayNewUserForm
}) => {
  return (
    <div className="ui container">
      {!user && !displayNewUserForm ? (
        <Link to={`/newuser`}>
          <button
            onClick={createNewUser}
            type="submit"
            className="ui inverted secondary basic left floated button"
          >
            Create Account
          </button>
        </Link>
      ) : null}
      {user ? (
        <Link to={`/`}>
          <button
            onClick={handleLogout}
            type="submit"
            className="ui inverted secondary basic right floated button"
          >
            Logout
          </button>
        </Link>
      ) : (
        <form className="ui right floated" onSubmit={handleSubmit}>
          <input name="username" type="text" />

          <button
            type="submit"
            className="ui inverted secondary basic button left-margin"
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default NavBar;
