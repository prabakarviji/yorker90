import React from "react";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";

export default function TeamScoreCard(props) {
  return(
    <Card>
      <CardBody>
        <h4>
          {props.teamName} {props.innings}<br/>
          { props.teamScore} - {props.totalWickets} ({props.oversCompleted})
        </h4>
        <h5></h5>
      </CardBody>
      {props.inningsName === '2nd Innings' &&
        <CardFooter stats>
          <div>
            Need 50 runs of 45 balls
          </div>
        </CardFooter>
      }
    </Card>
  )
}