import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import ScoreTab from "./ScoreTab.js";

import { firstInningTeamList } from "../../api/MatchApi";


const LiveMatch = inject("MatchScore")(observer(
  class LiveMatch extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount = () => {
      let match_id = this.props.location.state.match_id
      let innings_id = this.props.location.state.innings_id
      let first_inning = this.props.location.state.first_inning
      if(first_inning){
        firstInningTeamList(match_id, innings_id).then(response =>{
          this.props.MatchScore.battingCard = response.data.batting_card
          this.props.MatchScore.bowlingCard = response.data.bowling_card
          this.props.MatchScore.teamDetails = response.data.team_details
          this.props.MatchScore.NextBatsMens = response.data.next_batsmens
          this.props.MatchScore.NextBowlers = response.data.next_bowlers
          this.props.MatchScore.bowler_id = response.data.bowler_id
          this.props.MatchScore.non_strike_id = response.data.non_strike_id
          this.props.MatchScore.strike_id = response.data.strike_id
          this.props.MatchScore.inningsStart = true
          this.props.MatchScore.playedBatesMen= [response.data.strike_id, response.data.non_strike_id]
        })
      }
    }

    render() {
      return (
        <ScoreTab />
      )
    }
  })
);

export default LiveMatch;
