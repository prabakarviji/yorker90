import axios from "axios";

export function saveMatch(MatchData) {
  let url = process.env.REACT_APP_API_URL + "/api/v1/matches";
  return axios.post(url, { match: MatchData }).then(response => {
    return response.data;
  });
}

export function firstInningTeamList(match_id, innings_id){
  let url = process.env.REACT_APP_API_URL + "/api/v1/matches/first_inning_team_list";
  return axios.get(url, {params: {innings_id: innings_id, match_id: match_id}}).then(response => {
    return response;
  });
}

export function saveStrike(strike_id, non_strike_id, bowler_id, innings_id) {
  let url = process.env.REACT_APP_API_URL + "/api/v1/matches/save_strike";
  return axios.post(url,{innings: { strike_id: strike_id, non_strike_id: non_strike_id,
        bowler_id: bowler_id, id: innings_id}}).then(response => {
    return response.data;
  });
}
