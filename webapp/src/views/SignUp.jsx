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
import {createNewUser} from "../variables/common";
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const [localState, setLocalState] = useState({
        email: "",
        fname: "",
        lname: " ",
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
                    {locales("signUp")}
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label={locales("firstName")}
                                autoFocus
                                onChange={(event) => setLocalState({...localState, fname: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label={locales("lastName")}
                                name="lastName"
                                autoComplete="lname"
                                onChange={(event) => setLocalState({...localState, lname: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label={locales("email")}
                                name="email"
                                autoComplete="email"
                                onChange={(event) => setLocalState({...localState, email: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label={locales("password")}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(event) => setLocalState({...localState, password: event.target.value})}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {
                            createNewUser(localState.email, localState.password, `${localState.fname} ${localState.lname}`, null).then(() => {
                                window.location.replace("/login");
                            }, error => {
                                return new Error(error);
                            })
                        }}
                    >
                        {locales("signUpButton")}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {locales("defaultRegistrationLinkText")}
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
        </Container>
    );
}