import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {GoogleLogin} from "react-google-login";
import FacebookLogin from "react-facebook-login";
import Notifications from "./Notifications";
import {authorize, createNewUser} from "../methods/common";

const useStyles = makeStyles(theme => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white,
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	social: {
		margin: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	}
}));

const notif = React.createRef();

const auth = (email, password, name, image, isSocial) => {
	authorize(email, password).then((result) => {
		sessionStorage.setItem("sessionToken", result);
		window.location.replace("/admin/dashboard");
	}, () => {
		if (isSocial) {
			createNewUser(email, password, name, image).then(() => {
				auth(email, password, name, image, isSocial);
			}, error => {
                notif.current.notify("Unable to add new user");
				return new Error(error);
			})
		} else {
            notif.current.notify("Unable to authenticate");
        }
	});
};

export default function SignIn() {
	const classes = useStyles();

	const state = {
	    email: "",
        password: ""
    };

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline/>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon/>
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
                        onChange={(event) => state.email = event.target.value}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
                        onChange={(event) => state.password = event.target.value}
					/>
					<Button
						type="button"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
                        onClick={() => { auth(state.email, state.password, null, null, false) }}
					>
						Sign In
					</Button>
					<Grid container className={classes.social}>
						<Grid item className={classes.social}>
							<GoogleLogin
								clientId="682226085071-mi1itdp22j3qguu7cl3aph3s4s7sqj7g.apps.googleusercontent.com"
								cssClass={classes.submit}
								onSuccess={(response) => auth(response.profileObj.email,
									response.profileObj.googleId, response.profileObj.name,
									response.profileObj.imageUrl,
									true)}
								onFailure={() => {}}
								cookiePolicy={'single_host_origin'}/>
						</Grid>
						<Grid item className={classes.social}>
							<FacebookLogin
								appId="2471928086388329"
								autoLoad={false}
								fields="name,email,picture"
								scope="public_profile"
								icon="fa-facebook"
								callback={(response) => auth(response.email,
									response.id,
									response.name,
									response.picture.data.url)}
							/>
						</Grid>
					</Grid>
					<Grid container className={classes.social}>
						<Grid item className={classes.social}>
							<Link href="/new" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<>
				<Notifications type={"error"} place={"br"} ref={notif}/>
			</>
		</Container>
	);
}