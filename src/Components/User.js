import React from "react";
import NewUserForm from "./NewUserForm";
import UserContainer from "../Containers/UserContainer";

export default function User({
  user,
  username,
  displayNewUserForm,
  handleCreateUser,
  players
}) {
  return (
    <div>
      {displayNewUserForm ? (
        <NewUserForm username={username} handleCreateUser={handleCreateUser} />
      ) : (
        <UserContainer user={user} players={players} />
      )}
    </div>
  );
}
