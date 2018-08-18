import React, { Component } from "react";

export default class Player extends Component {
  state = {
    pie: "",
    data: {}
  };

  componentDidMount() {
    fetch(
      `http://stats.nba.com/stats/playerdashboardbyyearoveryear/?measureType=Advanced&perMode=PerGame&plusMinus=N&paceAdjust=N&rank=N&leagueId=00&season=2017-18&seasonType=Regular+Season&playerId=${
        this.props.player.person_id
      }&outcome=&location=&month=0&seasonSegment=&dateFrom=&dateTo=&opponentTeamId=0&vsConference=&vsDivision=&gameSegment=&period=0&shotClockRange=&lastNGames=0`
    )
      .then(res => res.json())
      .then(jsonData => {
        let offrtg = jsonData["resultSets"][0]["rowSet"][0][11];
        let dfrtg = jsonData["resultSets"][0]["rowSet"][0][12];
        let pie = jsonData["resultSets"][0]["rowSet"][0][24];
        let usg = jsonData["resultSets"][0]["rowSet"][0][22];

        let data = {
          playerName:
            this.props.player.first_name + " " + this.props.player.last_name,
          stats: {
            offrtg: offrtg,
            dfrtg: dfrtg,
            pie: pie,
            usg: usg
          }
        };
        console.log(this.props.player.first_name, this.props.player.last_name);
        console.log(data);
        this.setState({
          data: data
        });
      });

    fetch(`http://localhost:3000/api/v1/nba_players/${this.props.player.id}`, {
      method: "PATCH",
      body: JSON.stringify(this.state.data.stats),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(jsonData => {
        console.log(jsonData);
      });
  }

  addPieToDB = () => {
    const pie = this.state.pie;

    fetch(
      `https://limitless-bayou-72938.herokuapp.com/api/v1/nba_players/${
        this.props.player.id
      }`,
      {
        method: "PATCH",
        body: JSON.stringify({
          pie: pie
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(console.log);
  };

  render() {
    // this.addPieToDB();
    let suffix = "";
    // console.log("this.props.player.last_name", this.props.player.last_name);
    let lastName = this.props.player.last_name.split(" ")[0].toLowerCase();
    // console.log("lastName", lastName);
    suffix = this.props.player.last_name.split(" ")[1];

    // console.log("suffix", suffix);
    if (suffix !== "" && suffix !== undefined) {
      lastName = `${lastName}_${suffix.toLowerCase().split(".")[0]}`;
    }
    // console.log(lastName);

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
              <p>Offensive Rating: {this.props.player.offrtg}</p>
              <p>Defensive Rating: {this.props.player.dfrtg}</p>
              <p>PIE: {this.props.player.pie}</p>
              <p>Usage Percentage: {this.props.player.usg}</p>
            </div>
            <div className="extra content" />
            <br />
            <button
              onClick={() => this.props.handleClick(this.props.player)}
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
