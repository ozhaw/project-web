import React, {useEffect, useState} from "react";

import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import {createRESTUrl} from "../variables/general";
import {locales} from "../variables/locales";

export default function User() {
    const [data, setData] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [fname, setFname] = useState(null);
    const [sname, setSname] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const updateProfile = (event) => {
        event.preventDefault();

        if (!loading) {
            setSuccess(false);
            setLoading(true);

            new Promise((resolve, reject) => {
                fetch(createRESTUrl(`/user/api/user/operations`), {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${sessionStorage.getItem("sessionToken")}`,
                        'userId': sessionStorage.getItem("userId")
                    },
                    body: JSON.stringify({
                        username: fname && sname ? `${fname} ${sname}` : null,
                        photoUrl: photoUrl,
                    })
                }).then((response) => {
                    if (response.ok) {
                        resolve(response.json());
                    } else {
                        reject();
                    }
                })
            }).then((result) => {
                setData(result);
                setSuccess(true);
                setLoading(false);
            });
        }
    };

    useEffect(() => {
        if (!loaded) {
            new Promise((resolve, reject) => {
                fetch(createRESTUrl(`/user/api/user/operations`), {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem("sessionToken")}`,
                        'userId': sessionStorage.getItem("userId")
                    }
                }).then((response) => {
                    if (response.ok) {
                        resolve(response.json());
                    } else {
                        reject();
                    }
                });
            }).then((result) => {
                setData(result);
                setLoaded(true);
            });
        }
    });

    return loaded
        ? (
            <>
                <div className="content">
                    <Row>
                        <Col md="4">
                            <Card className="card-user">
                                <div className="image">
                                    <img
                                        alt="..."
                                        src={require("assets/img/damir-bosnjak.jpg")}
                                    />
                                </div>
                                <CardBody>
                                    <div className="author">
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                            <img
                                                alt={data.username}
                                                className="avatar border-gray"
                                                src={!data.photoUrl
                                                        ? require("assets/img/default-avatar.png")
                                                        : data.photoUrl
                                                }
                                            />
                                            <h5 className="title">{data.username}</h5>
                                        </a>
                                        <p className="description">{`@${data.username}`}</p>
                                    </div>
                                    <p className="description text-center">
                                        {locales("userAppliedOn")}
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="8">
                            <Card className="card-user">
                                <CardHeader>
                                    <CardTitle tag="h5">{locales("editProfile")}</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row>
                                            <Col className="pr-1" md="3">
                                                <FormGroup>
                                                    <label>{locales("username")}</label>
                                                    <Input
                                                        disabled
                                                        defaultValue={data.username}
                                                        placeholder={locales("username")}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-1" md="4">
                                                <FormGroup>
                                                    <label htmlFor="exampleInputEmail1">
                                                        {locales("email")}
                                                    </label>
                                                    <Input
                                                        placeholder={locales("email")}
                                                        type="email"
                                                        disabled
                                                        defaultValue={data.email}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <FormGroup>
                                                    <label>{locales("firstName")}</label>
                                                    <Input
                                                        onChange={(event) => setFname(event.target.value)}
                                                        placeholder={locales("firstName")}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-1" md="6">
                                                <FormGroup>
                                                    <label>{locales("lastName")}</label>
                                                    <Input
                                                        onChange={(event) => setSname(event.target.value)}
                                                        placeholder={locales("lastName")}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <FormGroup>
                                                    <label>{locales("imageUrl")}</label>
                                                    <Input
                                                        onChange={(event) => setPhotoUrl(event.target.value)}
                                                        placeholder={locales("imageUrl")}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <div className="update ml-auto mr-auto">
                                                <Button
                                                    variant="contained"
                                                    className="btn-round"
                                                    color="primary"
                                                    type="submit"
                                                    disabled={loading}
                                                    onClick={(event) => updateProfile(event)}
                                                >
                                                    {locales("updateProfile")}
                                                </Button>
                                                {loading && <CircularProgress size={24}/>}
                                            </div>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        ) : (
            <Grid
                container
                spacing={0}
                alignItems="center"
                justify="center"
                style={{minHeight: '100vh'}}
            >
                <CircularProgress color="secondary" disableShrink/>
            </Grid>
        );
}
