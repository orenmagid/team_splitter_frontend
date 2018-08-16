import React, { Component } from "react";
import Player from "../Components/Player";

export default class ComparisonsContainer extends Component {
  state = {
    selectedPlayer: null,
    selectedUser: ""
  };

  render() {
    return (
      <div>
        <select
          className="ui dropdown"
          onChange={this.props.handleSelect}
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

        <div className="ui three doubling stackable cards">
          {this.props.players.map(player => {
            return <Player key={player.id} player={player} />;
          })}
        </div>
      </div>
    );
  }
}
