import React from "react";
import {Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {Line} from "react-chartjs-2";

class LinePeakGraphCard extends React.Component {
    constructor(props) {
        super(props);

        this.updateTime =  new Date();

        this.options = {
            legend: {
                display: false
            },

            tooltips: {
                enabled: false
            },

            scales: {
                yAxes: [
                    {
                        ticks: {
                            fontColor: "#9f9f9f",
                            beginAtZero: false,
                            maxTicksLimit: 5
                        },
                        gridLines: {
                            drawBorder: false,
                            zeroLineColor: "#ccc",
                            color: "rgba(255,255,255,0.05)"
                        }
                    }
                ],
                xAxes: [
                    {
                        barPercentage: 1.6,
                        gridLines: {
                            drawBorder: false,
                            color: "rgba(255,255,255,0.1)",
                            zeroLineColor: "transparent",
                            display: false
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "#9f9f9f"
                        }
                    }
                ]
            }
        };
    }

    render() {
        const updateTime = Math.round((this.updateTime - new Date().getTime()) / 60000);

        return (
            <>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">{this.props.name}</CardTitle>
                                <p className="card-category">{this.props.category}</p>
                            </CardHeader>
                            <CardBody>
                                <Line
                                    data={this.props.data}
                                    options={this.options}
                                    width={400}
                                    height={100}
                                />
                            </CardBody>
                            <CardFooter>
                                <hr/>
                                <div className="stats">
                                    <i className="fa fa-history"/> Updated {updateTime} minutes ago
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </>
        );
    }
}

export default LinePeakGraphCard;
