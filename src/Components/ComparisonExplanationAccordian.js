import React, { Component } from "react";
import { Accordion, Icon } from "semantic-ui-react";

export default class ComparisonExplanationAccordian extends Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          What type of comparison should you be making?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>
            <a
              href="https://stats.nba.com/help/glossary/#pie"
              target="_blank"
              rel="noopener noreferrer"
            >
              Player Impact Estimate (PIE)
            </a>
            attempts to measure a player's overall statistical contribution
            against the total statistics in games they play. Below are five NBA
            players, along with this measure of their statistical impact on
            games. If these five players made up a team, they would have varying
            impacts on their team's chances of winning. The same is probably
            true of people in your group. If we assume that PIE measures this
            impact on a team's chances of winning, which of the below NBA
            players' PIE best represents {this.props.player.name}'s impact on
            his or her team's chances of winning?
          </p>
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          How will these comparisons be used?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>
            We'll take your comparisons as measures of each player's impact on
            his or her team's chances of winning. When it's time to play, we'll
            try generate evenly matched teams based on your ratings.
          </p>
        </Accordion.Content>
      </Accordion>
    );
  }
}
