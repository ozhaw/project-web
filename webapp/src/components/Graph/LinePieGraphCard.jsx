import React from "react";
import {Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {Pie} from "react-chartjs-2";
import LinePeakGraphCard from "./LinePeakGraphCard";

class LinePieGraphCard extends LinePeakGraphCard {

    render() {
        const updateTime = Math.round((this.updateTime - new Date().getTime()) / 60000);

        return (
            <>
                <Row>
                    <Col md="4">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">{this.props.name}</CardTitle>
                                <p className="card-category">{this.props.category}</p>
                            </CardHeader>
                            <CardBody>
                                <Pie
                                    data={this.props.data}
                                />
                            </CardBody>
                            <CardFooter>
                                /*<div className="legend">
                                    <i className="fa fa-circle text-primary" /> Opened{" "}
                                    <i className="fa fa-circle text-warning" /> Read{" "}
                                    <i className="fa fa-circle text-danger" /> Deleted{" "}
                                    <i className="fa fa-circle text-gray" /> Unopened
                                </div>*/
                                <hr />
                                <div className="stats">
                                    <i className="fa fa-history" /> Updated {updateTime} minutes ago
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </>
        );
    }
}

export default LinePieGraphCard;
