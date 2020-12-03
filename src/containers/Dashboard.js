import React from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";


// core components
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardIcon from "../components/Card/CardIcon.js";
import CardFooter from "../components/Card/CardFooter.js";
import { Link } from "react-router-dom";
import Button from "../components/CustomButtons/Button.js";

import "./dashboard.css";



import styles from "../assets/jss/material-dashboard-react/views/dashboardStyle.js";
// import logo from "../assets/img/s1.jpg";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Link to={"/admin/list_team"}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>group</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>TEAMS</p>
                <h3 className={classes.cardTitle}>2</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Link to={"/admin/list_team"}>1 Active team</Link>
                </div>
              </CardFooter>
            </Card>
          </Link>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="warning">
                <Icon>sports_cricket</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>MATCHES</p>
              <h3 className={classes.cardTitle}>15</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last Match on 20 June 2019
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={6} sm={6} md={3}>
          <Link to={"/admin/create_match"}>
            <Button color="white" fullWidth>
              <Icon>add_box</Icon> CREATE MATCH
            </Button>
          </Link>
        </GridItem>
        <GridItem xs={6} sm={6} md={3}>
          <Link to={{
                pathname: "/admin/live_match",
                state: { match_id: 1, first_inning: true, innings_id: 1 }
              }}
            >
            <Button fullWidth color="white">
              <Icon>replay</Icon> RESUME MATCH
            </Button>
          </Link>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
