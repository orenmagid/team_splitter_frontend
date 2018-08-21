import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({
  handleSubmit,
  user,
  handleLogout,
  createNewUser,
  displayNewUserForm
}) => {
  // const activeStyle = {
  //   background: "black"
  // };
  //
  // const style = {
  //   color: "white"
  // };
  return (
    <div className="ui container">
      {/* {user ? (
        // <div className="ui three item menu">
        //   <NavLink
        //     className="item"
        //     exact
        //     to="/"
        //     style={style}
        //     activeStyle={activeStyle}
        //   >
        //     User Profile
        //   </NavLink>
        // </div>
      ) : null} */}
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
        <form className="" onSubmit={handleSubmit}>
          <input name="username" type="text" />

          <button type="submit" className="ui inverted secondary basic button">
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default NavBar;
