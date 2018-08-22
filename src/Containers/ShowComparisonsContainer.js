import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import UserComparisonCard from "../Components/UserComparisonCard";
import TeamCard from "../Components/TeamCard";
import GenerateTeamsExplanationAccordian from "../Components/GenerateTeamsExplanationAccordian";

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
      }

      this.generateTeams(activePlayers);
    }
  };

  generateTeams = activePlayers => {
    let randPie = Math.floor(Math.random() * 19);
    let randPie1 = Math.floor(Math.random() * 19);
    let randPie2 = Math.floor(Math.random() * 19);
    activePlayers.sort((a, b) => {
      if (isNaN(parseFloat(a.pie)) && isNaN(parseFloat(b.pie))) {
        return randPie1 - randPie2;
      }
      if (isNaN(parseFloat(a.pie))) {
        return randPie - b.pie;
      }
      if (isNaN(parseFloat(b.pie))) {
        return a.pie - randPie;
      }
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

    this.setState({
      teamA: teamA,
      teamB: teamB,
      showTeams: true
    });
  };

  render() {
    if (this.props.users.length === 0) {
      return <Redirect to="/" />;
    }
    return (
      <div className="ui container">
        <Link to={`/`}>
          <button className="ui secondary basic labeled icon button">
            <i className="left chevron icon" />
            Back to Dashboard
          </button>
        </Link>
        <h2 className="bottom-margin">{this.props.group.name}</h2>
        <GenerateTeamsExplanationAccordian />
        <br />
        <div className="ui two doubling stackable cards">
          {this.state.showTeams ? (
            <React.Fragment>
              <TeamCard name="Team One" team={this.state.teamA} />
              <TeamCard name="Team Two" team={this.state.teamB} />
            </React.Fragment>
          ) : null}
        </div>
        <br />

        {this.state.activePlayers.length >= 4 ? (
          <button
            onClick={this.getEvenNumOfPlayers}
            className="ui secondary basic centered button top-margin"
          >
            {this.state.showTeams && this.state.activePlayers.length > 4
              ? "Regenerate Teams"
              : "Generate Teams"}
          </button>
        ) : null}

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
