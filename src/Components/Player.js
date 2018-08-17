import React, { Component } from "react";

export default class Player extends Component {
  state = {
    pie: ""
  };

  addPieToDB = () => {
    const pie = this.state.pie;

    fetch(`http://localhost:3000/api/v1/nba_players/${this.props.player.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        pie: pie
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(console.log);
  };

  render() {
    // this.addPieToDB();
    let suffix = "";
    console.log("this.props.player.last_name", this.props.player.last_name);
    let lastName = this.props.player.last_name.split(" ")[0].toLowerCase();
    console.log("lastName", lastName);
    suffix = this.props.player.last_name.split(" ")[1];

    console.log("suffix", suffix);
    if (suffix !== "" && suffix !== undefined) {
      lastName = `${lastName}_${suffix.toLowerCase().split(".")[0]}`;
    }
    console.log(lastName);

    let url;
    if (lastName === "") {
      url = `https://nba-players.herokuapp.com/players/${this.props.player.first_name
        .toLowerCase()
        .replace(/'/g, "A")}`;
    } else {
      url = `https://nba-players.herokuapp.com/players/${lastName
        .toLowerCase()
        .replace(/'/g, "A")}/${this.props.player.first_name
        .replace(/'/g, "A")
        .toLowerCase()}`;
    }

    return (
      <React.Fragment>
        <div className="ui card blue ">
          <div className="content">
            <img
              className="ui medium rounded image"
              src={url}
              alt="player-picture"
            />
            <div className="header">
              {this.props.player.first_name + " " + this.props.player.last_name}
            </div>
            <div className="meta" />
            <div className="description">
              <p>Position: {this.props.player.position}</p>

              <p>
                Height: {this.props.player.height_feet}'{" "}
                {this.props.player.height_inches}"
              </p>
              <p>PIE: {this.props.player.pie}</p>
            </div>
            <div className="extra content" />
            <br />
            <button
              // onClick={this.showStats}
              className="ui secondary basic button"
            >
              Make Comparison
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
