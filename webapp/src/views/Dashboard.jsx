import React from "react";
import {Col, Row} from "reactstrap";
import {
    dashboard24HoursPerformanceChart,
    dashboardEmailStatisticsChart,
    dashboardNASDAQChart
} from "variables/charts.jsx";

import Notifications from './Notifications';
import DataCard from '../components/Card/DataCard';
import {allIcons, colors} from "../variables/icons";
import LinePeakGraphCard from "../components/Graph/LinePeakGraphCard";
import LineDotGraphCard from "../components/Graph/LineDotGraphCard";
import LinePieGraphCard from "../components/Graph/LinePieGraphCard";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.notif = React.createRef();
    }

    onClick = () => {
        this.notif.current.notify("Hello!");
    };

    render() {
        return (
            <>
                <div className="content">
                    <Row>
                        <Col lg="3" md="6" sm="6">
                            <DataCard title={"Capacity"}
                                      value={"500 GB"}
                                      footer={"Update"}
                                      icon={allIcons["nc-basket"].name}
                                      iconColor={colors.blue}
                            />
                        </Col>
                    </Row>
                    <LinePeakGraphCard name={"name"}
                                       category={"category"}
                                       data={dashboard24HoursPerformanceChart.data}
                    />
                    <LineDotGraphCard name={"name"}
                                      category={"category"}
                                      data={dashboardNASDAQChart.data}
                    />
                </div>
                <button onClick={this.onClick}>Click</button>
                <Notifications type={"success"} place={"br"} ref={this.notif}/>
            </>
        );
    }
}

export default Dashboard;
