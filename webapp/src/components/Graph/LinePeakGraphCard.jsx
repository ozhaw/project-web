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

export default function LinePeakGraphCard(props) {
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
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col>
                                    <CardTitle tag="h5">{props.name}</CardTitle>
                                </Col>
                                {props.dropdownData && props.dropdownData.name && props.dropdownData.data ?
                                    <Col>
                                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                            <DropdownToggle caret>
                                                {props.dropdownData.name}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {props.dropdownData.data.map(item =>
                                                    <DropdownItem>
                                                        <div onClick={() => {props.dropdownCallback(item.value)}}> {item.label}</div>
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
