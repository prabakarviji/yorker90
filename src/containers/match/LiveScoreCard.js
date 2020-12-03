import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import WicketModal from "./WicketModal.js";
import OverChangeModal from "./OverChangeModal.js";
import BattingCard from "../../Atom/BattingCard.js";
import BowlingCard from "../../Atom/BowlingCard.js";
import TeamScoreCard from "../../Atom/TeamScoreCard.js";
import ScoringCard from "../../Atom/ScoringCard.js";


const LiveScoreCard = inject("MatchScore")(
  observer(
  class LiveScoreCard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        strike_id: '',non_strike_id: '',bowler_id: '',
        wicketModalOpen: false,
        overChangeModalOpen: false
      }
      this.scoreUpdate = this.scoreUpdate.bind(this);
      this.extraScore = this.extraScore.bind(this);
      this.calcualteSR = this.calcualteSR.bind(this);
      this.bowlingCard = this.bowlingCard.bind(this);
      this.strikeRotation = this.strikeRotation.bind(this);
      this.powerHitting = this.powerHitting.bind(this);
      this.changeStrike = this.changeStrike.bind(this);
      // this.ballScore = this.ballScore.bind(this);
      this.handleWicket = this.handleWicket.bind(this);
      this.handleWicketModalClose = this.handleWicketModalClose.bind(this)
      this.handleOverChange = this.handleOverChange.bind(this)
      this.handleOverChangeModalClose = this.handleOverChangeModalClose.bind(this)
      this.overScore = {  batsmen_id: 0, runs: 0, wide: false,
                        nb: false, byes: false, leg_byes: false, wicket: false,
                        type_of_wicket: '', bowler_id: 0, wicket_taker_id: null }
    }

    handleWicketModalClose(){
      this.setState({wicketModalOpen: false})
    }

    handleOverChangeModalClose(){
      this.props.MatchScore.bowler_id = this.props.MatchScore.nextBowlerId
      this.props.MatchScore.nextBowlerId = ''
      this.setState({overChangeModalOpen: false})
    }

    powerHitting(run){
      let strike_id = this.props.MatchScore.strike_id
      if(run === 4){
        let fours = this.props.MatchScore.battingCard[strike_id]['no_of_fours']
        this.props.MatchScore.battingCard[strike_id]['no_of_fours'] = fours  + 1
      }
      else if(run === 6){
        let six = this.props.MatchScore.battingCard[strike_id]['no_of_sixes']
        this.props.MatchScore.battingCard[strike_id]['no_of_sixes'] = six  + 1
      }
      this.scoreUpdate(run)
    }

    strikeRotation(run){
      this.scoreUpdate(run)
      this.changeStrike()
    }

    changeStrike(){
      let strike_id = this.props.MatchScore.strike_id
      let non_strike_id = this.props.MatchScore.non_strike_id
      this.props.MatchScore.strike_id = non_strike_id
      this.props.MatchScore.non_strike_id = strike_id
    }

    scoreUpdate(run){
      let strike_id = this.props.MatchScore.strike_id
      let runs = this.props.MatchScore.battingCard[strike_id]['score']
      let balls = this.props.MatchScore.battingCard[strike_id]['no_of_balls']
      runs  += run
      balls +=  1
      let teamScore = this.props.MatchScore.teamDetails.teamScore
      this.props.MatchScore.teamDetails.teamScore = teamScore + run
      this.props.MatchScore.battingCard[strike_id]['score'] = runs
      this.props.MatchScore.battingCard[strike_id]['no_of_balls'] = balls
      this.calcualteSR(runs, balls, strike_id)
      this.bowlingCard(run);
    }

    calcualteSR(runs, balls, strike_id){
      let strike_rate = ((runs/balls) * 100);
      this.props.MatchScore.battingCard[strike_id]['strike_rate'] = strike_rate.toFixed(2)
    }

    handleWide(runs){
      console.log("Wide")
    }

    extraScore(run){
      console.log(run)
      this.bowlingCard(run);
    }

    handleWicket(wicket){
      this.setState({wicketModalOpen: true})
    }

    bowlingCard(run){
      let bowler_id = this.props.MatchScore.bowler_id
      let over = parseFloat(this.props.MatchScore.bowlingCard[bowler_id]['no_of_overs'])
      let oversCompleted = parseFloat(this.props.MatchScore.teamDetails.oversCompleted)
      over +=  0.1
      oversCompleted += 0.1
      if((over + "").split(".")[1] === '6'){
        over = Math.round(over)
        oversCompleted = Math.round(oversCompleted)
        this.handleOverChange()
      }
      this.props.MatchScore.bowlingCard[bowler_id]['no_of_overs'] = over.toFixed(1)
      this.props.MatchScore.teamDetails.oversCompleted = oversCompleted.toFixed(1)
      if(run === 'W'){
        this.props.MatchScore.bowlingCard[bowler_id]['no_of_wickets'] += 1
      }
      else{
        this.props.MatchScore.bowlingCard[bowler_id]['runs'] += run
      }
    }

    handleOverChange(){
      this.changeStrike()
      this.setState({overChangeModalOpen:  true})
    }

    // ballScore(score){
    //  // { batsmen_id: 1, runs: 1, wide: true, nb: true, byes: true, leg_byes: true, wicket: false, type_of_wicket: '', bower_id: 14, wicket_taker_id: '' }

    //   let ball_score = {  batsmen_id: this.state.strike_id, runs: 1, wide: true,
    //                     nb: true, byes: true, leg_byes: true, wicket: false,
    //                     type_of_wicket: '', bower_id: this.state.bower_id, wicket_taker_id: '' }
    // }


    render() {
      return (
        <React.Fragment>
          <TeamScoreCard
            teamName={this.props.MatchScore.teamDetails.teamName}
            innings={this.props.MatchScore.teamDetails.innings}
            teamScore={this.props.MatchScore.teamDetails.teamScore}
            totalWickets={this.props.MatchScore.teamDetails.totalWickets}
            oversCompleted={this.props.MatchScore.teamDetails.oversCompleted}
          />

          {this.props.MatchScore.inningsStart &&
            <BattingCard
              strikerScore={Object.values(this.props.MatchScore.battingCard[this.props.MatchScore.strike_id])}
              nonStrikeScore={Object.values(this.props.MatchScore.battingCard[this.props.MatchScore.non_strike_id])}
            />
          }
          {this.props.MatchScore.inningsStart &&
            <BowlingCard
              bowlingCard={Object.values(this.props.MatchScore.bowlingCard[this.props.MatchScore.bowler_id])}
            />
          }
          <ScoringCard
            scoreUpdate={this.scoreUpdate}
            handleWicket={this.handleWicket}
            handleWide={this.handleWide}
            strikeRotation={this.strikeRotation}
            powerHitting={this.powerHitting}
          />
          { this.state.wicketModalOpen &&
            <WicketModal closeModal={this.handleWicketModalClose}
              batsmenScore={Object.values(this.props.MatchScore.battingCard[this.props.MatchScore.strike_id])}
              playedBatesMen ={this.props.MatchScore.playedBatesMen}
            />
          }
         { this.state.overChangeModalOpen &&
            <OverChangeModal
              closeModal={this.handleOverChangeModalClose}
              NextBowlers={this.props.MatchScore.NextBowlers}
              currentBowler={this.props.MatchScore.bowler_id}
              nextBowlerCard={
                this.props.MatchScore.nextBowlerId ? Object.values(this.props.MatchScore.bowlingCard[this.props.MatchScore.nextBowlerId]) : 
                []}

            /> }
        </React.Fragment>
      )
    }
  })
);

export default LiveScoreCard;



