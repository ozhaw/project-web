import React, {useEffect, useState} from "react";
import {Col, Row} from "reactstrap";
import {dashboard24HoursPerformanceChart, dashboardNASDAQChart} from "variables/charts.jsx";

import Notifications from './Notifications';
import DataCard from '../components/Card/DataCard';
import {allIcons, colors} from "../variables/icons";
import LinePeakGraphCard from "../components/Graph/LinePeakGraphCard";
import LineDotGraphCard from "../components/Graph/LineDotGraphCard";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {createRESTUrl} from "../variables/general";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

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
	const [devicesData, setDevicesData] = useState(null);
	const [devicesDataLoaded, setDevicesDataLoaded] = useState(false);

	const notif = React.createRef();
	const classes = useStyles();

	useEffect(() => {
		if (!devicesDataLoaded) {
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
				setDevicesData(result);
				setDevicesDataLoaded(true);
			});
		}
	});

	const onClick = () => {
		notif.current.notify("Hello!");
	};

	return (
		<>
			<div className="content">
				{devicesDataLoaded ?
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
								{devicesData.map((item, index) =>
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

				<LinePeakGraphCard name={"name"}
				                   category={"category"}
				                   data={dashboard24HoursPerformanceChart.data}
				/>
				<LineDotGraphCard name={"name"}
				                  category={"category"}
				                  data={dashboardNASDAQChart.data}
				/>
			</div>
			<button onClick={() => {
				onClick()
			}}>Click
			</button>
			<Notifications type={"success"} place={"br"} ref={notif}/>
		</>
	);
}
