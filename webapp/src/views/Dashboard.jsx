import React, {useEffect, useState} from "react";
import {Col, Row} from "reactstrap";

import Notifications from './Notifications';
import DataCard from '../components/Card/DataCard';
import {allIcons, colors} from "../variables/icons";
import LinePeakGraphCard from "../components/Graph/LinePeakGraphCard";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {createRESTUrl} from "../variables/general";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import LineDotGraphCard from "../components/Graph/LineDotGraphCard";

const useStyles = makeStyles(theme => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
		color: 'white'
	},
	ePanel: {
		marginBottom: '15px',
		background: '#2c2c2c'
	},
	loader: {
		marginBottom: '15px'
	}
}));

export default function Dashboard() {
	const [localState, setLocalState] = useState({
		devicesData: null,
		devicesDataLoaded: false,
		deviceInfoData: null,
		deviceInfoDataLoaded: false,
		selectedDeviceIndex: -1,
		filteredDeviceInfoData: null
	});

	const notif = React.createRef();
	const classes = useStyles();

	useEffect(() => {
		if (!localState.devicesDataLoaded) {
			new Promise((resolve, reject) => {
				fetch(createRESTUrl(`/device/api/device/users/${sessionStorage.getItem("userId")}/devices`), {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${sessionStorage.getItem("sessionToken")}`
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
					state.devicesData = result.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
                    state.selectedDeviceIndex = state.devicesData[0].id;
					state.devicesDataLoaded = true;

					setLocalState(state);
				}
			});
		} else if (localState.devicesDataLoaded && !localState.deviceInfoDataLoaded) {
			return getDeviceDetailedInfo();
		}
	});

	const getDeviceDetailedInfo = () => {
	    if (localState.selectedDeviceIndex !== -1) {
            new Promise((resolve, reject) => {
                fetch(createRESTUrl(`/device/api/device/${localState.selectedDeviceIndex}/info`), {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem("sessionToken")}`
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
                	result.forEach(item => {
                		item.auditDate = new Date(item.auditDate)
	                });
                	
                    state.deviceInfoData = result;
                    state.deviceInfoDataLoaded = true;
                    state.filteredDeviceInfoData = result;

                    setLocalState(state);
                }
            });
        }
	};

	const onClick = () => {
		notif.current.notify("Hello!");
	};

	const timeRangeCallback = (isValid) => {
		if (localState.deviceInfoDataLoaded) {
			let state = {...localState};
			state.filteredDeviceInfoData = localState.deviceInfoData.filter(item => isValid(item.auditDate));
			setLocalState(state);
		}
	};

	const deviceInfoChartCallback = (id) => {
	    if (id !== localState.selectedDeviceIndex) {
            let state = {...localState};
            state.selectedDeviceIndex = id;
            state.deviceInfoData = null;
            state.deviceInfoDataLoaded = false;
            setLocalState(state);
        }
	};

	const barColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

	const prepareDeviceInfoDataTemplate = () => {
		let combinedData = {};
		localState.filteredDeviceInfoData.forEach(item => {
			combinedData[item.deviceStatus] = combinedData[item.deviceStatus] ? combinedData[item.deviceStatus] + 1 : 1
		});

		let labels = [];
		let datasets = [];

		for (let key of Object.keys(combinedData)) {
			labels.push(key);
			datasets.push(combinedData[key]);
		}

		return {
			labels: labels,
			datasets: [{
				borderColor: barColor,
				pointRadius: 1,
				pointHoverRadius: 1,
				borderWidth: 3,
				data: datasets
			}]
		};
	};

	return (
		<>
			<div className="content">
				{localState.devicesDataLoaded ?
					<ExpansionPanel className={classes.ePanel}>
						<ExpansionPanelSummary
							aria-controls="panel1a-content"
							id="panel1a-header"
							expandIcon={<ExpandMoreIcon/>}
						>
							<Typography className={classes.heading}>User`s Devices</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Row>
								{localState.devicesData.map((item, index) =>
									<Col>
										<DataCard title={item.type}
										          value={item.deviceId}
										          footer={"Active"}
										          icon={allIcons["nc-camera-compact"].name}
										          iconColor={colors.blue}
										/>
									</Col>
								)}
							</Row>
						</ExpansionPanelDetails>
					</ExpansionPanel> : (
						<Grid
							className={classes.loader}
							container
							spacing={0}
							alignItems="center"
							justify="center"
						>
							<CircularProgress color="secondary" disableShrink/>
						</Grid>
					)}

				{localState.deviceInfoDataLoaded ?
					<LinePeakGraphCard name={"Device Information"}
					                   category={"Device state for a period of time"}
					                   data={() => prepareDeviceInfoDataTemplate()}
					                   dropdownCallback={deviceInfoChartCallback}
					                   enableTimeRange
					                   timeCallback={timeRangeCallback}
					                   dropdownData={localState.devicesDataLoaded ?
						                   {
							                   name: "Devices",
							                   data: localState.devicesData.map(item => {
								                   return {
									                   label: item.deviceId,
									                   value: item.id
								                   };
							                   })
						                   } : null}
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
					)}

				{localState.deviceInfoDataLoaded ?
					<LineDotGraphCard name={"Device Information"}
									   category={"Device state for a period of time"}
									   data={() => prepareDeviceInfoDataTemplate()}
									   dropdownCallback={deviceInfoChartCallback}
									   enableTimeRange
									   timeCallback={timeRangeCallback}
									   dropdownData={localState.devicesDataLoaded ?
										   {
											   name: "Devices",
											   data: localState.devicesData.map(item => {
												   return {
													   label: item.deviceId,
													   value: item.id
												   };
											   })
										   } : null}
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
					)}

			</div>
			<button onClick={() => {
				onClick()
			}}>Click
			</button>
			<Notifications type={"success"} place={"br"} ref={notif}/>
		</>
	);
}
