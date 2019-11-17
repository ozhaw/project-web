import React, {useEffect, useState} from "react";

import {Col, Row} from "reactstrap";
import SimpleTable from "../components/Table";
import {createRESTUrl} from "../variables/general";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import moment from "moment";

const parseDate = (obj) => {
    Object.keys(obj).forEach((key) => {
        obj[key].forEach((item) => item.auditDate = moment(new Date(item.auditDate)).format("dddd, MMMM Do YYYY, h:mm:ss a"));
    });
};

const useStyles = makeStyles(theme => ({
    loader: {
        marginBottom: '15px'
    }
}));

export default function Tables() {
    const [localState, setLocalState] = useState({
        deviceInfoData: null,
        deviceInfoDataLoaded: false,
        healthInfoData: null,
        healthInfoDataLoaded: false
    });

    const classes = useStyles();

    useEffect(() => {
        if (!localState.deviceInfoDataLoaded) {
            getDeviceDetailedInfo();
        } else if (!localState.healthInfoDataLoaded) {
            getHealthDetailedInfo();
        }
    });

    const getDeviceDetailedInfo = () => {
        new Promise((resolve, reject) => {
            fetch(createRESTUrl(`/device/api/device/info`), {
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
            let state = {...localState};
            if (result) {
                parseDate(result);

                state.deviceInfoData = result;
                state.deviceInfoDataLoaded = true;

                setLocalState(state);
            }
        });
    };

    const getHealthDetailedInfo = () => {
        new Promise((resolve, reject) => {
            fetch(createRESTUrl(`/user/api/user/health`), {
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
            let state = {...localState};
            if (result) {
                parseDate(result);

                state.healthInfoData = result;
                state.healthInfoDataLoaded = true;

                setLocalState(state);
            }
        });
    };

    const prepareDeviceInfoData = () => {
        let result = [];

        Object.keys(localState.deviceInfoData).forEach((key) => {
            let deviceIdWasUsed = false;

            localState.deviceInfoData[key].forEach((item) => {
                let subdata = [""];
                if (!deviceIdWasUsed) {
                    subdata[0] = key;
                    deviceIdWasUsed = true
                }

                result.push([...subdata, item.deviceStatus, item.auditDate]);
            })
        });

        return result;
    };

	const prepareHealthInfoData = () => {
		let result = [];

		Object.keys(localState.healthInfoData).forEach((key) => {
			let deviceIdWasUsed = false;

			localState.healthInfoData[key].forEach((item) => {
				let subdata = [""];
				if (!deviceIdWasUsed) {
					subdata[0] = key;
					deviceIdWasUsed = true
				}

				result.push([...subdata, item.healthStatus, item.auditDate]);
			})
		});

		return result;
	};

    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        {localState.deviceInfoDataLoaded ?
                            <SimpleTable title={"Device Information"}
                                         headers={["Device ID", "Info", "Audit Date"]}
                                         data={prepareDeviceInfoData()}
                            /> : (
                                <Grid
                                    className={classes.loader}
                                    container
                                    spacing={0}
                                    alignItems="center"
                                    justify="center"
                                >
                                    <CircularProgress color="secondary" disableShrink/>
                                </Grid>
                            )
                        }
                        {localState.healthInfoDataLoaded ?
                            <SimpleTable title={"Health Information"}
										 headers={["Device ID", "Health Status", "Audit Date"]}
                                         data={prepareHealthInfoData()}
                            /> : (
                                <Grid
                                    className={classes.loader}
                                    container
                                    spacing={0}
                                    alignItems="center"
                                    justify="center"
                                >
                                    <CircularProgress color="secondary" disableShrink/>
                                </Grid>
                            )
                        }
                    </Col>
                </Row>
            </div>
        </>
    );
}
