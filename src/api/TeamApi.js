import axios from "axios";

export function saveTeam(TeamData) {
  let url = process.env.REACT_APP_API_URL + "/api/v1/teams";
  return axios.post(url, TeamData).then(response => {
    return response.data;
  });
}


export function listTeam(){
  console.log(process.env.REACT_APP_API_URL)
  let url = process.env.REACT_APP_API_URL + "/api/v1/teams";
  return axios.get(url).then(response => {
    return response;
  });
}