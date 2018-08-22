import React, { Component } from "react";

export default class UserComparisonCard extends Component {
  state = {
    active: false
  };

  handleToggle = avg => {
    if (this.state.active) {
      this.props.removeFromActivePlayers(this.props.user);
    } else {
      let userWithAverage = this.props.user;
      userWithAverage.pie = avg;
      this.props.addToActivePlayers(userWithAverage);
    }
    this.setState({
      active: !this.state.active
    });
  };

  render() {
    let { user, comparisons } = this.props;

    let userComparisons = comparisons.filter(
      comparison => comparison.user_id === user.id
    );

    let sumPie = 0;
    for (let i = 0; i < userComparisons.length; i++) {
      sumPie += parseFloat(userComparisons[i].pie, 10) * 100;
    }

    let avgPie = sumPie / userComparisons.length;

    // let sumUSG = 0;
    // for (let i = 0; i < userComparisons.length; i++) {
    //   sumUSG += parseFloat(userComparisons[i].usg, 10) * 100;
    // }
    //
    // let avgUSG = sumUSG / userComparisons.length;

    // let sumOff = 0;
    // for (let i = 0; i < userComparisons.length; i++) {
    //   sumOff += parseFloat(userComparisons[i].offrtg, 10);
    // }
    //
    // let avgOff = sumOff / userComparisons.length;
    //
    // let sumDef = 0;
    // for (let i = 0; i < userComparisons.length; i++) {
    //   sumDef += parseFloat(userComparisons[i].dfrtg, 10);
    // }
    //
    // let avgDef = sumDef / userComparisons.length;

    return (
      <React.Fragment>
        <div className="ui card blue ">
          <div className="content">
            <div className="header">
              <img
                alt="basketball player avatar"
                className="ui bordered avatar image"
                src="../noun_basketball_player_1646799.png"
              />
              {user.name}
            </div>
            <div className="meta" />
            <div className="description">
              <p>Height: {user.height} Inches</p>
              {userComparisons.length !== 0 ? (
                <React.Fragment>
                  <p>Average PIE of Comparisons: {avgPie.toFixed(2)}</p>
                  {/* <p>Average Usage Percentage: {avgUSG.toFixed(2)}%</p> */}
                  {/* <p>
                    Average Off. Efficiency of Comparisons: {avgOff.toFixed(2)}
                  </p>
                  <p>
                    Average Def. Efficiency of Comparisons: {avgDef.toFixed(2)}
                  </p> */}
                  <p>Number of Comparisons: {userComparisons.length}</p>
                </React.Fragment>
              ) : null}
            </div>
            <div className="extra content" />
            <br />
            <div className="ui toggle checkbox">
              <input
                type="checkbox"
                name="active"
                onChange={() => this.handleToggle(avgPie)}
                checked={this.state.active}
              />
              <label>Playing?</label>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
