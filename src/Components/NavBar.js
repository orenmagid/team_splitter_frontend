import React from "react";
// import { Link, NavLink } from "reacxt-router-dom";

const NavBar = ({ handleSubmit, user }) => {
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
