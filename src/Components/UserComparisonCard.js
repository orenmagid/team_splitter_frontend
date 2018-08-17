import React from "react";

export default function UserComparisonCard({ user, comparisons }) {
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
              <p>Average PIE of Comparisons: {avg.toFixed(2)}</p>
            ) : null}
          </div>
          <div className="extra content" />
          <br />
        </div>
      </div>
    </React.Fragment>
  );
}
