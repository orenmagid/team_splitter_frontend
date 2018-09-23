import React, { Component } from "react";
import Player from "../Components/Player";

export default class ComparisonsContainer extends Component {
  constructor(props) {
    super(props);
    this.allNbaPlayers = [];
    this.state = {
      selectedPlayer: null,
      selectedUser: "",
      allNbaPlayers: []
    };
  }

  componentDidMount() {
    fetch("https://limitless-bayou-72938.herokuapp.com/api/v1/nba_players")
      .then(res => res.json())
      .then(jsonData => {
        this.allNbaPlayers = jsonData;
        this.setState({
          selectedUser: this.state.selectedUser
        });
      });
  }

  componentWillUpdate() {
    fetch("https://limitless-bayou-72938.herokuapp.com/api/v1/nba_players")
      .then(res => res.json())
      .then(jsonData => {
        this.allNbaPlayers = jsonData;
      });
  }

  handleSelect = event => {
    event.preventDefault();
    if (event.target.value !== "default") {
      let currentUser = this.props.users.find(user => {
        return user.id === parseInt(event.target.value);
      });
      this.setState({
        selectedUser: currentUser
      });
    }
  };
  triggerReRender = () => {
    this.setState({
      selectedUser: this.state.selectedUser
    });
  };
  render() {
    let players = (
      <React.Fragment>
        <h3>
          Out of your group, which player is {this.state.selectedUser.name} most
          similar to?
        </h3>
        <div className="ui three doubling stackable cards">
          {this.allNbaPlayers.map(player => {
            return <Player key={player.id} player={player} />;
          })}
        </div>
      </React.Fragment>
    );

    let selectedUser = this.state.selectedUser;
    return (
      <div>
        <select
          className="ui dropdown"
          onChange={this.handleSelect}
          value={this.state.selectedUser}
        >
          <option className="item" value="default" key="default">
            Select a Group Member to Compare
          </option>
          {this.props.users.map(user => {
            return (
              <option className="item" value={user.id} key={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
        <br />
        <button
          onClick={this.triggerReRender}
          className="ui secondary basic button"
        >
          Get New Players
        </button>

        {/* Conditionally Render Some Number of Players So User Can Make Comparisons once there's a selectedUser in State
        onClick of Player of Player Card, Post new comparison */}

        {selectedUser ? players : null}
      </div>
    );
  }
}
