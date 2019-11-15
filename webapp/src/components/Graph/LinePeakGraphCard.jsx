import React, {useState} from "react";
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardTitle,
	Col,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Row
} from "reactstrap";
import {Bar} from "react-chartjs-2";
import moment from "moment";

const notNegativeAndLess = (value, range) => value >= 0 && value <= range;

export default function LinePeakGraphCard(props) {
	const [dropdownState, setDropdownState] = useState({
		dataDropdownOpen: false,
		timeDropDownOpen: false
	});

	const updateTime = new Date();
	const options = {
		legend: {
			display: false
		},

		tooltips: {
			enabled: true
		}
	};

	const dateRanges = [
		{
			name: "All time",
			isValid: (date) => true
		},
		{
			name: "This year",
			isValid: (date) => moment(new Date()).diff(moment(date), 'years') === 0
		},
		{
			name: "This month",
			isValid: (date) => moment(new Date()).diff(moment(date), 'months') === 0
		},
		{
			name: "This week",
			isValid: (date) => moment(new Date()).diff(moment(date), 'weeks') === 0
		},
		{
			name: "This day",
			isValid: (date) => moment(new Date()).diff(moment(date), 'days') === 0
		},
		{
			name: "This half-day",
			isValid: (date) => notNegativeAndLess(moment(new Date()).diff(moment(date), 'hours'), 12)
		},
		{
			name: "This hour",
			isValid: (date) => notNegativeAndLess(moment(new Date()).diff(moment(date), 'hours'), 1)
		},
		{
			name: "30 minutes",
			isValid: (date) => notNegativeAndLess(moment(new Date()).diff(moment(date), 'minutes'), 30)
		},
		{
			name: "15 minutes",
			isValid: (date) => notNegativeAndLess(moment(new Date()).diff(moment(date), 'minutes'), 15)
		}
	];

	const toggle = () => {
		let state = {...dropdownState};
		state.dataDropdownOpen = !state.dataDropdownOpen;
		setDropdownState(state);
	};

	const toggleTime = () => {
		let state = {...dropdownState};
		state.timeDropDownOpen = !state.timeDropDownOpen;
		setDropdownState(state);
	};


	const getLastUpdatedTime = () => Math.round((updateTime - new Date().getTime()) / 60000);

	return (
		<>
			<Row>
				<Col md="12">
					<Card>
						<CardHeader>
							<Row>
								<Col>
									<CardTitle tag="h5">{props.name}</CardTitle>
								</Col>
								{props.dropdownData && props.dropdownData.name && props.dropdownData.data ?
									<Col>
										<Dropdown isOpen={dropdownState.dataDropdownOpen} toggle={toggle}>
											<DropdownToggle caret>
												{props.dropdownData.name}
											</DropdownToggle>
											<DropdownMenu>
												{props.dropdownData.data.map(item =>
													<DropdownItem>
														<div onClick={() => {
															props.dropdownCallback(item.value)
														}}>{item.label}</div>
													</DropdownItem>
												)}
											</DropdownMenu>
										</Dropdown>
									</Col> : null
								}
								{props.enableTimeRange ?
									<Col>
										<Dropdown isOpen={dropdownState.timeDropDownOpen} toggle={toggleTime}>
											<DropdownToggle caret>
												Time Range
											</DropdownToggle>
											<DropdownMenu>
												{dateRanges.map(item =>
													<DropdownItem>
														<div onClick={() => {
															props.timeCallback(item.isValid)
														}}>{item.name}</div>
													</DropdownItem>
												)}
											</DropdownMenu>
										</Dropdown>
									</Col> : null
								}
							</Row>
							<p className="card-category">{props.category}</p>
						</CardHeader>
						<CardBody>
							<Bar
								data={props.data}
								options={options}
								width={400}
								height={100}
							/>
						</CardBody>
						<CardFooter>
							<hr/>
							<div className="stats">
								<i className="fa fa-history"/> Updated {getLastUpdatedTime()} minutes ago
							</div>
						</CardFooter>
					</Card>
				</Col>
			</Row>
		</>
	);
}
