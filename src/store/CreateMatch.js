import { observable, decorate, action } from "mobx";

const MatchScore = class CreateMatch {
  teamAList = [];
  teamBList = [];
  matchData = { teama_id: '', teamb_id: '', number_of_overs: '', toss_win_id: '', user_id: 1}
  selectedTeam = []

  updateTeam(team_id, inputName, team_name){
    this.matchData[inputName] = team_id
    if(inputName === 'teamb_id' || inputName === 'teama_id'){
      this.selectedTeam.push({id: team_id, name: team_name})
    }
  }
};
decorate(MatchScore, {
  teamAList: observable,
  teamBList: observable,
  matchData: observable,
  selectedTeam: observable,
  updateTeam: action,
});

export default new MatchScore();