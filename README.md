# Team Splitter

This is the repository for the frontend of a project <a href="https://github.com/awchang12">Anthony Chang</a> and I worked on for the React module of the Flatiron School's Immersive Software Engineering Bootcamp.

The backend repository is available <a href="https://github.com/orenmagid/team_splitter_backend">here</a>.

Team Splitter is an app designed to help groups of pickup basketball players choose teams fairly, and have fun in the process.


## How it Works

Basically, if you play basketball with a group regularly, you'd all create accounts and rate each other, and these ratings would be used to divide players into teams. You'd rate each other by comparing each other to NBA basketball players.

Let's say your group's name is "Bucket Patrol" and John is a regular. When you rate John, you'll be asked, "In the context of Bucket Patrol, which player is John most similar to?" and presented with something like the following:

<img src="https://github.com/orenmagid/team_splitter_backend/blob/master/ScreenShot.1.png">

Notice that each NBA player has a PIE. PIE stands for Player Impact Estimate, which is a statistic that attempts to measure a player's overall statistical contribution against the total statistics in games they play. If the five players in the screnshot above made up a team, they would have varying impacts on their team's chances of winning. The same is certainly true of the players in Bucket Patrol. If we assume that PIE measures this impact on a team's chances of winning, you'd want to compare him to the NBA players whose PIE best represents John's impact on his or her team's chances of winning. If he's one of the best in the group, probably Drummand or Curry. If he's middle of the road, McCullough or Chriss. If he'd have the least positive impact on his team's chances of winning, Haslem. 

You'd rate everyone, including yourself, in your group, and they'd do the same. After these ratings, everyone would have an average PIE of the NBA players they were compared to, and it's this average PIE or comparisons that would then be used to divide up teams. For each game, you'd indicate which group members are actually present. Then you'd generate teams. If an odd number of players wants in, one is randomly chosen to sit out. Then the remaining players are split up: the highest-rated player on Team A, second-highest on Team B; the third-highest on Team A, fourth-highest on Team B; etc. Then the final two players are switched, so that the highest- and lowest-rated players are on the same team.  

Is this really a fair way to split up teams? I have no idea. It seems like a start though.

Might this lead to hurt feelings, or even fights? It's possible. But does being compared to Udonis Haslem really sting more than being picked last, or not at all? There's at least also the potential for more fun with this process.


## Demo

You can check it out at https://team-splitter.herokuapp.com/. Because Heroku's <a href="https://devcenter.heroku.com/articles/free-dyno-hours">free dyno hours</a> <a href="https://devcenter.heroku.com/articles/free-dyno-hours#dyno-sleeping">go to sleep</a> if the app hasn't been used in thirty minutes, the app may be unresponsive for about 30 secs when you first attempt to use it. Unfortunately, this applies to the frontend and the backend. So, it may be about thirty seconds before the webpage loads, and then another delay before the database is responsive.


To login as a demo user, user the username "jimmy".


## License

MIT
