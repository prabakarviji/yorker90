import { observable, decorate, action } from "mobx";

const MatchScore = class MatchScore {
  overScore = [];
  battingCard = {};
  bowlingCard = {};
  teamScore = 0;
  backupScore = [];
  strike_id = 0;
  non_strike_id = 0;
  bowler_id = 0;
  oversCompleted = 0;
  totalWickets = 0;
  NextBatsMens = [];
  NextBowlers = [];
  inningsStart = false;
  playedBatesMen= []
  nextBowlerId=0;
  teamDetails = {
    teamName: "",
    innings: "",
    teamScore: 0,
    oversCompleted: 0,
    totalWickets: 0
  };
  wicketData = {
    wicket_type: "",
    wicket_taker_id: null,
    next_batsman_id: null
  };

  updateSBowler(bowler_id, inputName, bowler_name) {
    this.bowler_id = bowler_id;
  }

  nextBowler(bowlerId){
    this.nextBowlerId = bowlerId;
  }

  updateStrike(batsmen_id, inputName, batsmen_name) {
    if (inputName === "striker") {
      this.strike_id = batsmen_id;
    } else {
      this.non_strike_id = batsmen_id;
    }
  }

  update(id, input, name) {
    this.wicketData[input] = id;
    console.log(this.wicketData);
  }
};

decorate(MatchScore, {
  overScore: observable,
  battingCard: observable,
  bowlingCard: observable,
  backupScore: observable,
  strike_id: observable,
  non_strike_id: observable,
  bowler_id: observable,
  teamDetails: observable,
  NextBatsMens: observable,
  NextBowlers: observable,
  inningsStart: observable,
  nextBowlerId: observable,
  updateStrike: action,
  updateSBowler: action,
  nextBowler: action,
});

export default new MatchScore();
