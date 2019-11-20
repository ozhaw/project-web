import React from "react";

import {Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import {makeStyles} from "@material-ui/core";
import {createRESTUrl} from "../variables/general";
import {saveAs} from "file-saver";
import {locales} from "../variables/locales";

const useStyles = makeStyles(theme => ({
    thead: {
        color: '#2c2c2c',
        fontWeight: '600'
    },
	download: {
    	cursor: 'pointer',
		marginTop: '20px'
	}
}));

export default function SimpleTable(props) {
    const classes = useStyles();

    const exportData = () => {
        let name = "report.csv";
        fetch(createRESTUrl(`/reports/api/reports/export/csv`), {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("sessionToken")}`,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                data: props.data,
                headers: props.headers,
                title: props.title
            })
        }).then((response) => {
            if (response.headers.get("FileName")) {
                name = response.headers.get("FileName");
            }
            return response.blob()
        }).then((blob) => saveAs(blob, name));
    };

    return (
        <Card>
            <CardHeader>
				<Row>
					<Col>
						<CardTitle tag="h4">{props.title}</CardTitle>
					</Col>
					<Col>
						<div className={classes.download}>
							<div className="stats" onClick={exportData}>
								<i className="fa fa-download"/> {locales("downloadCSV")}
							</div>
						</div>
					</Col>
				</Row>
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
