import React, { Component } from "react";
import { Link } from "react-router-dom";
import Player from "../Components/Player";

export default class MakeComparisonsContainer extends Component {
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

  handleClick = nbaPlayer => {
    this.setState({
      selectedPlayer: nbaPlayer
    });

    this.postComparison(nbaPlayer);
  };

  postComparison = nbaPlayer => {
    let data = {
      user_id: this.state.selectedUser.id,
      rater_id: this.props.currentUser.id,
      group_id: this.props.group.id,
      nba_player_id: nbaPlayer.id,
      pie: nbaPlayer.pie,
      offrtg: nbaPlayer.offrtg,
      dfrtg: nbaPlayer.dfrtg,
      usg: nbaPlayer.usg
    };
    fetch(`https://limitless-bayou-72938.herokuapp.com/api/v1/comparisons`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(console.log);
  };

  handleSelect = event => {
    event.preventDefault();
    if (event.target.value !== "default") {
      let currentUser = this.props.users.find(user => {
        return user.id === parseInt(event.target.value);
      });
      console.log(currentUser);
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
          similar to.
        </h3>
        <div className="ui three doubling stackable cards">
          {this.allNbaPlayers.map(player => {
            return (
              <Player
                key={player.id}
                player={player}
                handleClick={this.handleClick}
              />
            );
          })}
        </div>
      </React.Fragment>
    );

    let selectedUser = this.state.selectedUser;
    return (
      <div className="ui container">
        <Link to={`/`}>
          <button className="ui secondary basic labeled icon button">
            <i className="left chevron icon" />
            Back to Dashboard
          </button>
        </Link>
        <h2>{this.props.group.name}</h2>
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

        {selectedUser ? (
          <button
            onClick={this.triggerReRender}
            className="ui secondary basic button block"
          >
            Get New Players
          </button>
        ) : null}

        {/* Conditionally Render Some Number of Players So User Can Make Comparisons once there's a selectedUser in State
        onClick of Player of Player Card, Post new comparison */}
        {selectedUser ? players : null}
        {/* <button
          onClick={this.triggerReRender}
          className="ui secondary basic button"
        >
          Get New Players
        </button> */}
      </div>
    );
  }
}
