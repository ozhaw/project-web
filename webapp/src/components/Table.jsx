import React from "react";

import {Card, CardBody, CardHeader, CardTitle, Table} from "reactstrap";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	thead: {
		color: '#2c2c2c',
		fontWeight: '600'
	}
}));

export default function SimpleTable(props) {
	const classes = useStyles();

	return (
		<Card>
			<CardHeader>
				<CardTitle tag="h4">{props.title}</CardTitle>
			</CardHeader>
			<CardBody>
				<Table responsive>
					<thead className={classes.thead}>
						{props.headers ?
							(
								<tr>
									{props.headers.map(value => <td>{value}</td>)}
								</tr>
							) : null
						}
					</thead>
					<tbody>
						{props.data ?
							(
								props.data.map(value => <tr>
									{value.map(subvalue => <td>{subvalue}</td>)}
								</tr>)
							) : null
						}
					</tbody>
				</Table>
			</CardBody>
		</Card>

	);
}
