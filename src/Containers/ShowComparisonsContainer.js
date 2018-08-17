import React, { Component } from "react";
import UserComparisonCard from "../Components/UserComparisonCard";

export default class ShowComparisonsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ui three doubling stackable cards">
        {this.props.users.map(user => {
          return (
            <UserComparisonCard
              user={user}
              comparisons={this.props.comparisons}
            />
          );
        })}
      </div>
    );
  }
}
