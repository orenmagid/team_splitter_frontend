import React, { Component } from "react";
import UserComparisonCard from "../Components/UserComparisonCard";

export default class ShowComparisonsContainer extends Component {
  state = {
    activePlayers: [],
    teamA: [],
    teamB: []
  };

  addToActivePlayers = userWithAverage => {
    this.setState({
      activePlayers: [...this.state.activePlayers, userWithAverage]
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
        activePlayers = activePlayers.splice(
          (Math.floor(Math.random() * this.state.activePlayers.length), 1)
        );
      }
      this.generateTeams(activePlayers);
    }
  };

  generateTeams = activePlayers => {
    activePlayers.sort((a, b) => {
      return a.pie - b.pie;
    });
    activePlayers.reverse();
    let teamA = [];
    let teamB = [];
    for (let i = 0; i < activePlayers.length; i++) {
      if (i % 2 === 0) {
        teamA.push(activePlayers[i]);
      } else {
        teamB.push(activePlayers[i]);
      }
    }
    let teamAOne = teamA[1];
    let teamBOne = teamB[1];
    teamA.splice(1, 1, teamBOne);
    teamB.splice(1, 1, teamAOne);
    if (activePlayers.length > 4) {
      let teamALast = teamA[teamA.length - 1];
      let teamBLast = teamB[teamB.length - 1];
      teamA.splice(1, 1, teamBLast);
      teamB.splice(1, 1, teamALast);
    }

    this.setState({
      teamA: teamA,
      teamB: teamB
    });
  };

  render() {
    return (
      <div>
        <br />
        <button
          onClick={this.getEvenNumOfPlayers}
          className="ui secondary basic button"
        >
          Generate Teams
        </button>
        <br />

        <br />
        <div className="ui three doubling stackable cards">
          {this.props.users.map(user => {
            return (
              <UserComparisonCard
                // active={this.state.selectAll ? true : false}
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
