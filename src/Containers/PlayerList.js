import React, { Component } from "react";
import Player from "../Components/Player";

export default class PlayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="ui three doubling stackable cards">
          {this.props.players.map(player => {
            return <Player key={player.person_id} player={player} />;
          })}
        </div>

        <br />
      </React.Fragment>
    );
  }
}
