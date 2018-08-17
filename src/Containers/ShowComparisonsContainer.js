import React, { Component } from "react";
import UserComparisonCard from "../Components/UserComparisonCard";

export default class ShowComparisonsContainer extends Component {
  state = {
    activePlayers: []
  };

  addToActivePlayers = user => {
    this.setState({
      activePlayers: [...this.state.activePlayers, user]
    });
  };

  removeFromActivePlayers = user => {
    let activePlayers = this.state.activePlayers;
    let index = activePlayers.indexOf(user);
    activePlayers.splice(index, 1);
    this.setState({
      activePlayers: activePlayers
    });
  };

  getEvenNumOfPlayers = () => {
    let activePlayers = [...this.state.activePlayers];
    if (activePlayers.length >= 4) {
      if (activePlayers.length % 2 !== 0) {
        activePlayers.splice(
          (Math.floor(Math.random() * this.state.activePlayers.length), 1)
        );
      }
      this.generateTeams();
    }
  };

  render() {
    return (
      <div>
        <br />
        <button
          // onClick={this.triggerReRender}
          className="ui secondary basic button"
        >
          Generate Teams
        </button>
        <br />
        <div className="ui three doubling stackable cards">
          {this.props.users.map(user => {
            return (
              <UserComparisonCard
                addToActivePlayers={this.addToActivePlayers}
                removeFromActivePlayers={this.removeFromActivePlayers}
                key={user.id}
                user={user}
                comparisons={this.props.comparisons}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
