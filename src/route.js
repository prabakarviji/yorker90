/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "../src/containers/Dashboard.js";
import ListTeamPage from "../src/containers/ListTeam.js";
import LiveMatch from "../src/containers/match/LiveMatch.js";
import CreateMatch from "../src/containers/match/CreateMatch.js";
import InningsStart from "../src/containers/match/InningsStart.js";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/list_team",
    name: "List Team",
    icon: Dashboard,
    component: ListTeamPage,
    layout: "/admin"
  },
  {
    path: "/live_match",
    name: "Live Match",
    icon: Dashboard,
    component: LiveMatch,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/create_match",
    name: "Create Match",
    icon: Dashboard,
    component: CreateMatch,
    layout: "/admin"
  },
  {
    path: "/innings_start",
    name: "Innings Start",
    icon: Dashboard,
    component: InningsStart,
    layout: "/admin",
    invisible: true
  }
];

export default dashboardRoutes;
