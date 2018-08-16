import React, { Component } from "react";

export default class Player extends Component {
  state = {
    pie: ""
  };

  componentDidMount() {
    // fetch(
    //   `http://stats.nba.com/stats/playerdashboardbyyearoveryear/?measureType=Advanced&perMode=PerGame&plusMinus=N&paceAdjust=N&rank=N&leagueId=00&season=2017-18&seasonType=Regular+Season&playerId=${
    //     this.props.player.person_id
    //   }&outcome=&location=&month=0&seasonSegment=&dateFrom=&dateTo=&opponentTeamId=0&vsConference=&vsDivision=&gameSegment=&period=0&shotClockRange=&lastNGames=0`
    // )
    //   .then(res => res.json())
    //   .then(jsonData => {
    //     this.setState({
    //       pie: jsonData.resultSets[0].rowSet[0][24]
    //     });
    //   });
  }

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
    let url = `https://nba-players.herokuapp.com/players/${this.props.player.last_name.toLowerCase()}/${this.props.player.first_name.toLowerCase()}`;

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
          </div>
        </div>
      </React.Fragment>
    );
  }
}
