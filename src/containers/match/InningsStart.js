import React, { Component } from "react";
// import { NewPatientSchema } from "../../validations/patients";
import { saveStrike, firstInningTeamList } from "../../api/MatchApi";
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


import { styled } from '@material-ui/core/styles';
const CustomFormControl = styled(FormControl)({
  minWidth: 140,
  'margin-left': 90,
  'margin-bottom': 30,
});


const InningsStart = inject("MatchScore")(observer(class InningsStart extends Component {

  constructor(props) {
    super(props);
    this.state = { match_id: '', innings_id: '', first_inning: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(){
    let strike_id = this.props.MatchScore.strike_id
    let non_strike_id = this.props.MatchScore.non_strike_id
    let bowler_id = this.props.MatchScore.bowler_id
    saveStrike(strike_id, non_strike_id, bowler_id, this.state.innings_id).then(response => {
      this.props.history.push({
        pathname: "/admin/live_match",
        state: { match_id: this.state.match_id, first_inning: true, innings_id: this.state.innings_id }
      })
    })
  }

  componentDidMount = () => {
    let match_id = this.props.location.state.match_id
    let innings_id = this.props.location.state.innings_id
    let first_inning = this.props.location.state.first_inning
    this.setState({match_id: match_id, innings_id: innings_id, first_inning: first_inning })
    if(first_inning){
      firstInningTeamList(match_id, innings_id).then(response =>{
        this.props.MatchScore.NextBatsMens = response.data.next_batsmens
        this.props.MatchScore.NextBowlers = response.data.next_bowlers
      })
    }
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
                  <SelectBox values={this.props.MatchScore.NextBatsMens}
                    defaultLabel={"Batsment Facing"}
                    StoreName={'MatchScore'}
                    StoreAction={'updateStrike'}
                    inputName='striker'
                    duplicateValue={[this.props.MatchScore.non_strike_id]}
                  />
                </GridItem>
                </FormControl>
                <CustomFormControl>
                <GridItem xs={12} sm={12} md={4} >
                <InputLabel>VS</InputLabel>
                </GridItem>
                </CustomFormControl>
                <GridItem xs={12} sm={12} md={4}>
                  <SelectBox values={this.props.MatchScore.NextBatsMens}
                    defaultLabel={"Non striker"}
                    StoreName={'MatchScore'}
                    StoreAction={'updateStrike'}
                    inputName='non_striker'
                    duplicateValue={[this.props.MatchScore.strike_id]}
                   />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <SelectBox values={this.props.MatchScore.NextBowlers}
                    defaultLabel={"Select bowler"}
                    StoreName={'MatchScore'}
                    StoreAction={'updateSBowler'}
                    inputName='bowler_id'
                    duplicateValue={[]}
                   />
                </GridItem>
              </GridContainer>

            </CardBody>
            <CardFooter>
              <Button color="warning" onClick={()=> this.handleSubmit() }>Start Match</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      </div>
    );
  }
}))

export default InningsStart;
