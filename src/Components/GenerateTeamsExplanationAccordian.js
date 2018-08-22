import React, { Component } from "react";
import { Accordion, Icon } from "semantic-ui-react";

export default class GenerateTeamsExplanationAccordian extends Component {
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
          What have we here?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>
            Below are the players in your group, along with the average Player
            Impact Estimate (PIE) of the NBA players they were compared them to.
          </p>
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          What is PIE, or Player Impact Estimate?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>
            <a
              href="https://stats.nba.com/help/glossary/#pie"
              target="_blank"
              rel="noopener noreferrer"
            >
              Player Impact Estimate (PIE)
            </a>{" "}
            attempts to measure a player's overall statistical contribution
            against the total statistics in games they play.
          </p>
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          How do I generate teams?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <p>
            Once you indicate that at least four players are playing, you'll be
            able to generate teams. If an odd number of players hope to play,
            we'll randomly select one to sit out.
          </p>
        </Accordion.Content>
      </Accordion>
    );
  }
}
