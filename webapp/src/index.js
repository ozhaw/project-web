import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Redirect, Route, Router, Switch} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.jsx";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";

const hist = createBrowserHistory();

ReactDOM.render(
	<Router history={hist}>
		<Switch>
			<Route path="/admin" render={props => <AdminLayout {...props} />}/>
			<Route path="/login" render={props => <SignIn {...props} />}/>
			<Route path="/new" render={props => <SignUp {...props} />}/>
			<Redirect to="/admin/dashboard"/>
		</Switch>
	</Router>,
	document.getElementById("root")
);
