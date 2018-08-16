import React, { Component } from "react";
import Player from "../Components/Player";

export default class ComparisonsContainer extends Component {
  state = {
    selectedPlayer: null,
    selectedUser: ""
  };

  handleSelect = event => {
    let currentUser = this.props.users.find(user => {
      return user.id === parseInt(event.target.value);
    });
    console.log(currentUser);
    this.setState({
      selectedUser: currentUser
    });
  };

  render() {
    return (
      <div>
        <select
          className="ui dropdown"
          onChange={this.handleSelect}
          value={this.state.selectedUser}
        >
          {this.props.users.map(user => {
            return (
              <option className="item" value={user.id} key={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>

        {/* Conditionally Render Some Number of Players So User Can Make Comparisons once there's a selectedUser in State
        onClick of Player of Player Card, Post new comparison */}

        <div className="ui three doubling stackable cards">
          {this.props.players.map(player => {
            return <Player key={player.id} player={player} />;
          })}
        </div>
      </div>
    );
  }
}
