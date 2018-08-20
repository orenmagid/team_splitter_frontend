import React, { Component } from "react";
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
        // console.log(jsonData);
        // this.setState({
        //   allNbaPlayers: jsonData
        // });
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
        // console.log(jsonData);
        // this.setState({
        //   allNbaPlayers: jsonData
        // });
        this.allNbaPlayers = jsonData;
        // this.setState({
        //   selectedUser: this.state.selectedUser
        // });
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
    console.log("this.allNbaPlayers", this.allNbaPlayers);

    let players = (
      <React.Fragment>
        <h3>
          In group {this.props.group.name}, which player is {this.state.selectedUser.name} most
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
