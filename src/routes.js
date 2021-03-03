/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UpdateLearning from "views/UpdateLearning.js";
import NewTraining from "views/NewTraining.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import ViewTrainings from "views/ViewTrainings.js";
import UserPage from "views/User.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    image: "assets/img/dashboard.svg"
  },
  {
    path: "/newtraining",
    name: "New Training",
    icon: "nc-icon nc-diamond",
    component: NewTraining,
    layout: "/admin",
  },
  {
    path: "/trainings",
    name: "View Trainings",
    icon: "nc-icon nc-pin-3",
    component: ViewTrainings,
    layout: "/admin",
  },
  {
    path: "/updateLearning",
    name: "Update Learning",
    icon: "nc-icon nc-bell-55",
    component: UpdateLearning,
    layout: "/admin",
  }
  // ,{
  //   path: "/user-page",
  //   name: "Settings",
  //   icon: "nc-icon nc-single-02",
  //   component: UserPage,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Help",
  //   icon: "nc-icon nc-tile-56",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/admin",
  // }
];
export default routes;
