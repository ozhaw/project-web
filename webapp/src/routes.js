import Dashboard from "views/Dashboard.jsx";
import Tables from "views/Tables.jsx";
import UserPage from "views/User.jsx";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin"
  },
  {
    path: "/reports",
    name: "Reports",
    icon: "nc-icon nc-tile-56",
    component: Tables,
    layout: "/admin"
  }
];

export default routes;
