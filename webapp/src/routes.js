import Dashboard from "views/Dashboard.jsx";
import Tables from "views/Tables.jsx";
import UserPage from "views/User.jsx";
import {locales} from "./variables/locales";

const routes = [
  {
    path: "/dashboard",
    name: locales("dashboard"),
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user-page",
    name: locales("userProfile"),
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin"
  },
  {
    path: "/reports",
    name: locales("reports"),
    icon: "nc-icon nc-tile-56",
    component: Tables,
    layout: "/admin"
  }
];

export default routes;
