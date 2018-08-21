import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ handleSubmit, user, handleLogout }) => {
  // const activeStyle = {
  //   background: "black"
  // };
  //
  // const style = {
  //   color: "white"
  // };
  return (
    <React.Fragment>
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

      {user ? (
        <Link to={`/`}>
          <button
            onClick={handleLogout}
            type="submit"
            className="ui inverted secondary basic button"
          >
            Logout
          </button>
        </Link>
      ) : (
        <form onSubmit={handleSubmit}>
          <input name="username" type="text" />

          <button type="submit" className="ui inverted secondary basic button">
            Login
          </button>
        </form>
      )}
    </React.Fragment>
  );
};

export default NavBar;
