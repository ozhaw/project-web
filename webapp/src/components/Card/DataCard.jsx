import React from "react";
import {Card, CardBody, CardFooter, CardTitle, Col, Row} from "reactstrap";

export default function DataCard(props) {
	const cardIcon = `nc-icon ${props.icon} ${props.iconColor}`;

	return (
		<>
			<Card className="card-stats">
				<CardBody>
					<Row>
						<Col md="4" xs="5">
							<div className="icon-big text-center icon-warning">
								<i className={cardIcon}/>
							</div>
						</Col>
						<Col md="8" xs="7">
							<div className="numbers">
								<p className="card-category">{props.title}</p>
								<CardTitle tag="p">{props.value}</CardTitle>
								<p/>
							</div>
						</Col>
					</Row>
				</CardBody>
				<CardFooter>
					<hr/>
					<div className="stats">
						{props.footer}
					</div>
				</CardFooter>
			</Card>
		</>
	);
};