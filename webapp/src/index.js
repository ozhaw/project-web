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
import {createRESTUrl} from "./variables/general";
import SignUp from "./views/SignUp";

const hist = createBrowserHistory();

const isValid = async () => {
	 await fetch(createRESTUrl(`/authentication/api/authentication/verify`), {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${sessionStorage.getItem("sessionToken")}`
		}
	}).then((result) => {
		if (result.ok) {
			ReactDOM.render(
				<Router history={hist}>
					<Switch>
						<Route path="/admin" render={props => <AdminLayout {...props} />}/>
						<Route path="/login" render={props => <SignIn {...props} />}/>
						<Route path="/new" render={props => <SignUp {...props} />}/>
						<Route path="/logout" render={() => {
							sessionStorage.clear();
							return <Redirect to="/login"/>;
						}}/>
						<Redirect to="/login"/>
					</Switch>
				</Router>,
				document.getElementById("root")
			);
		} else {
			ReactDOM.render(
				<Router history={hist}>
					<Switch>
						<Route path="/admin" render={() => {
							sessionStorage.clear();
							return <Redirect to="/login"/>
						}}/>
						<Route path="/login" render={props => <SignIn {...props} />}/>
						<Route path="/new" render={props => <SignUp {...props} />}/>
						<Route path="/logout" render={() => {
							sessionStorage.clear();
							return <Redirect to="/login"/>
						}}/>
						<Redirect to="/login"/>
					</Switch>
				</Router>,
				document.getElementById("root")
			);
		}
	 });
};

isValid();