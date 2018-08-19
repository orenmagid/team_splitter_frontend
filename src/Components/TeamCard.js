import React from "react";

export default function TeamCard({ team }) {
  return (
    <React.Fragment>
      <div className="ui card blue ">
        <div className="content">
          <div className="header">Team</div>
          <div className="meta" />
          <div className="description">
            {team.map(player => {
              return <p key={player.id}>{player.name}</p>;
            })}
          </div>
          <div className="extra content" />
          <br />
        </div>
      </div>
    </React.Fragment>
  );
}
