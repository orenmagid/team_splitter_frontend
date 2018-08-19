import React, { Component } from "react";
import UserComparisonCard from "../Components/UserComparisonCard";
import TeamCard from "../Components/TeamCard";

export default class ShowComparisonsContainer extends Component {
  state = {
    activePlayers: [],
    showTeams: false,
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
        let index = Math.floor(Math.random() * activePlayers.length);
        activePlayers = activePlayers.filter(player => {
          return player !== activePlayers[index];
        });
        console.log("index", index);
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
        if (i === activePlayers.length - 2) {
          teamB.push(activePlayers[i]);
        } else {
          teamA.push(activePlayers[i]);
        }
      } else {
        if (i === activePlayers.length - 1) {
          teamA.push(activePlayers[i]);
        } else {
          teamB.push(activePlayers[i]);
        }
      }
    }

    console.log("teamA", teamA);
    console.log("teamB", teamB);

    this.setState({
      teamA: teamA,
      teamB: teamB
    });
  };

  render() {
    return (
      <div>
        <div className="ui two doubling stackable cards">
          <TeamCard team={this.state.teamA} />
          <TeamCard team={this.state.teamB} />

          <br />
        </div>
        <br />
        <button
          onClick={this.getEvenNumOfPlayers}
          className="ui secondary basic centered button"
        >
          Generate Teams
        </button>
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
