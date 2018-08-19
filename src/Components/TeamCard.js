import React from "react";

export default function TeamCard({ team, name }) {
  team = team.sort((a, b) => {
    return a.pie - b.pie;
  });
  return (
    <React.Fragment>
      <div className="ui card blue ">
        <div className="content">
          <div className="header">{name}</div>
          <div className="meta" />
          <div className="description">
            {team.reverse().map(player => {
              return (
                <p key={player.id}>
                  {" "}
                  <img
                    className="ui bordered avatar image"
                    src="../noun_Basketball_1671463.svg"
                  />{" "}
                  {player.name}
                </p>
              );
            })}
          </div>
          <div className="extra content" />
          <br />
        </div>
      </div>
    </React.Fragment>
  );
}
