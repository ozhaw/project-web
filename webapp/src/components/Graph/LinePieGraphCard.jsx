import React, {useState} from "react";
import {Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {Pie} from "react-chartjs-2";

export default function LinePieGraphCard() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const updateTime = new Date();
    const options = {
        legend: {
            display: false
        },

        tooltips: {
            enabled: true
        }
    };

    const toggle = () => setDropdownOpen(prevState => !prevState);
    const getLastUpdatedTime = () => Math.round((updateTime - new Date().getTime()) / 60000);

    return (
        <>
            <Row>
                <Col md="4">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h5">{props.name}</CardTitle>
                            <p className="card-category">{props.category}</p>
                        </CardHeader>
                        <CardBody>
                            <Pie
                                data={props.data}
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