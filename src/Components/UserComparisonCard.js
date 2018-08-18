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
    let { user, comparisons, active } = this.props;

    let userComparisons = comparisons.filter(
      comparison => comparison.user_id === user.id
    );

    let sum = 0;
    for (let i = 0; i < userComparisons.length; i++) {
      sum += parseInt(userComparisons[i].pie, 10);
    }

    let avg = sum / userComparisons.length;

    console.log("avg", avg);

    return (
      <React.Fragment>
        <div className="ui card blue ">
          <div className="content">
            {/* <img
              className="ui medium rounded image"
              src={url}
              alt="player-picture"
            /> */}
            <div className="header">{user.name}</div>
            <div className="meta" />
            <div className="description">
              <p>Height: {user.height} Inches</p>
              {userComparisons.length !== 0 ? (
                <React.Fragment>
                  <p>Average PIE of Comparisons: {avg.toFixed(2)}</p>
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
                onChange={() => this.handleToggle(avg)}
                checked={this.state.active}
              />
              <label>Currently Playing?</label>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
