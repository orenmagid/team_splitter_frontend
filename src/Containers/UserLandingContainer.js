import React from "react";
import NewUserForm from "../Components/NewUserForm";
import UserContainer from "../Containers/UserContainer";

export default function UserLandingContainer({
  user,
  username,
  displayNewUserForm,
  handleCreateUser
}) {
  return (
    <div>
      {displayNewUserForm ? (
        <NewUserForm username={username} handleCreateUser={handleCreateUser} />
      ) : (
        <UserContainer user={user} />
      )}
    </div>
  );
}
