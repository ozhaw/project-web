import React, {useState} from "react";
import {Line} from "react-chartjs-2";
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
import {dateRanges} from "../../variables/general";
import {localePlaceholders, locales} from "../../variables/locales";

export default function LineDotGraphCard(props) {
    const [dropdownState, setDropdownState] = useState({
        dataDropdownOpen: false,
        timeDropDownOpen: false
    });

    const updateTime = new Date();

    const options = {
        legend: {
            display: false
        },

        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        return props.yLabels[value];
                    }
                }
            }],
            xAxes: [{
                display: false
            }]
        },

        pieceLabel: {
            render: "percentage",
            fontColor: ["white"],
            precision: 2
        },

        tooltips: {
            enabled: true
        }
    };


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
                                                {locales("timeRange")}
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
                            <Line
                                data={props.data}
                                options={options}
                                width={400}
                                height={100}
                            />
                        </CardBody>
                        <CardFooter>
                            <hr/>
                            <div className="stats">
                                <i className="fa fa-history"/> {localePlaceholders("lastUpdated", getLastUpdatedTime())}
                            </div>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
