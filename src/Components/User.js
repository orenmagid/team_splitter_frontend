import React from "react";
import NewUserForm from "./NewUserForm";

export default function User({
  user,
  username,
  displayNewUserForm,
  handleCreateUser
}) {
  return (
    <div>
      <h1>User Component</h1>
      {displayNewUserForm ? (
        <NewUserForm username={username} handleCreateUser={handleCreateUser} />
      ) : null}
    </div>
  );
}
