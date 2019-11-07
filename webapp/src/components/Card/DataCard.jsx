import React from "react";
import {Card, CardBody, CardFooter, CardTitle, Col, Row} from "reactstrap";

class DataCard extends React.Component {

    render() {
        const cardIcon = `nc-icon ${this.props.icon} ${this.props.iconColor}`;

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
                                    <p className="card-category">{this.props.title}</p>
                                    <CardTitle tag="p">{this.props.value}</CardTitle>
                                    <p/>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <hr/>
                        <div className="stats">
                            {this.props.footer}
                        </div>
                    </CardFooter>
                </Card>
            </>
        );
    }
}

export default DataCard;
