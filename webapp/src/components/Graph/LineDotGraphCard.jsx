import React, {useState} from "react";
import LinePeakGraphCard from "./LinePeakGraphCard";
import {Bar} from "react-chartjs-2";
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

export default function LineDotGraphCard(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const updateTime = new Date();
    const options = {
        legend: {
            display: false
        },

        pieceLabel: {
            render: "percentage",
            fontColor: ["white"],
            precision: 2
        },

        tooltips: {
            enabled: false
        },

        scales: {
            yAxes: [
                {
                    ticks: {
                        display: false
                    },
                    gridLines: {
                        drawBorder: false,
                        zeroLineColor: "transparent",
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
                        zeroLineColor: "transparent"
                    },
                    ticks: {
                        display: false
                    }
                }
            ]
        }
    };

    const toggle = () => setDropdownOpen(prevState => !prevState);
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
                                <Col>
                                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                        <DropdownToggle caret>
                                            Dropdown
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem header>Header</DropdownItem>
                                            <DropdownItem>Some Action</DropdownItem>
                                            <DropdownItem disabled>Action (disabled)</DropdownItem>
                                            <DropdownItem divider/>
                                            <DropdownItem>Foo Action</DropdownItem>
                                            <DropdownItem>Bar Action</DropdownItem>
                                            <DropdownItem>Quo Action</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
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
