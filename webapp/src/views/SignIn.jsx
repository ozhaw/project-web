import React, {useState} from 'react';
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
import {authorize, createNewUser} from "../variables/common";
import {localeNames, locales} from "../variables/locales";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

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
        sessionStorage.setItem("sessionToken", result.securityToken);
        sessionStorage.setItem("userId", result.userId);
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
	const [localState, setLocalState] = useState({
		email: "",
		password: "",
		dropdownOpen: false
	});

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    {locales("techLimbHeader")}
                </Typography>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {locales("signIn")}
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={locales("email")}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(event) => setLocalState({...localState, email: event.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={locales("password")}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => setLocalState({...localState, password: event.target.value})}
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {
                            auth(localState.email, localState.password, null, null, false)
                        }}
                    >
                        {locales("signInButton")}
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
                                onFailure={() => {
                                }}
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
                                {locales("defaultAuthorizationLinkText")}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
				<Dropdown
					nav
					isOpen={localState.dropdownOpen}
					toggle={() => setLocalState({...localState, dropdownOpen: !localState.dropdownOpen})}
				>
					<DropdownToggle caret>
						<span>{locales("lang")}</span>
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem tag="a" onClick={() => {
							localStorage.setItem("locale", localeNames.en);
						}}>
							{locales("english")}
						</DropdownItem>
						<DropdownItem tag="a" onClick={() => {
							localStorage.setItem("locale", localeNames.ru);
						}}>
							{locales("russian")}
						</DropdownItem>
						<DropdownItem tag="a" onClick={() => {
							localStorage.setItem("locale", localeNames.ua);
						}}>
							{locales("ukranian")}
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
            </div>
            <>
                <Notifications type={"danger"} place={"br"} ref={notif}/>
            </>
        </Container>
    );
}