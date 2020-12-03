import React, { Component } from "react";
// import { NewPatientSchema } from "../../validations/patients";
import { listTeam } from "../../api/TeamApi";
import { saveMatch } from "../../api/MatchApi";
// import Grid from '@material-ui/core/Grid';
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import SelectBox from "../../Atom/SelectBox.js";
import { observer, inject } from "mobx-react";
import TextField from '@material-ui/core/TextField';

import { styled } from '@material-ui/core/styles';
const CustomFormControl = styled(FormControl)({
  minWidth: 140,
  'margin-left': 90,
  'margin-bottom': 30,
});


const CreateMatch = inject("CreateMatch")(observer(class CreateMatch extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    listTeam().then(response =>{
      this.props.CreateMatch.teamAList = response.data.teams;
      this.props.CreateMatch.teamBList = response.data.teams;
    })
  }

  handleSubmit(){
    saveMatch(this.props.CreateMatch.matchData).then(response =>{
      this.props.history.push({
        pathname: "/admin/innings_start",
        state: { match_id: response.match_id, first_inning: true, innings_id: response.first_inning }
      })
    })
  }

  render(){
    return (
      <div>
        <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="warning">
              Create Match
            </CardHeader>
            <CardBody>
              <GridContainer>
                <FormControl >
                <GridItem xs={12} sm={12} md={4}>
                  <SelectBox values={this.props.CreateMatch.teamAList}
                    defaultLabel={"Choose Team A"}
                    StoreName={'CreateMatch'}
                    StoreAction={'updateTeam'}
                    inputName='teama_id'
                    duplicateValue={[this.props.CreateMatch.matchData.teamb_id]}
                  />
                </GridItem>
                </FormControl>
                <CustomFormControl>
                <GridItem xs={12} sm={12} md={4} >
                <InputLabel>VS</InputLabel>
                </GridItem>
                </CustomFormControl>
                <GridItem xs={12} sm={12} md={4}>
                  <SelectBox values={this.props.CreateMatch.teamBList}
                    defaultLabel={"Choose Team B"}
                    StoreName={'CreateMatch'}
                    StoreAction={'updateTeam'}
                    inputName='teamb_id'
                    duplicateValue={[this.props.CreateMatch.matchData.teama_id]}
                   />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <SelectBox values={this.props.CreateMatch.selectedTeam}
                    defaultLabel={"Batting team"}
                    StoreName={'CreateMatch'}
                    StoreAction={'updateTeam'}
                    inputName='toss_win_id'
                    duplicateValue={[]}
                   />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="Number of Overs"
                    margin="normal"
                    variant="outlined"
                    onChange={(e)=> this.props.CreateMatch.matchData.number_of_overs = e.target.value }
                  />
                </GridItem>
              </GridContainer>

            </CardBody>
            <CardFooter>
              <Button color="warning" onClick={()=> this.handleSubmit()}>CREATE</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      </div>
    );
  }
}))

export default CreateMatch;
