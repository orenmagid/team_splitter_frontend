import React from "react";

export default function NewUserForm({ username, handleCreateUser }) {
  return (
    <form className="ui form" onSubmit={handleCreateUser}>
      <div className="field">
        <label>UserName</label>
        <input type="text" name="username" placeholder={username} />
      </div>
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
      <button className="ui button" type="submit">
        Submit
      </button>
    </form>
  );
}
