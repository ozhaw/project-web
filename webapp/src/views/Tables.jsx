import React from "react";

import {Col, Row} from "reactstrap";
import SimpleTable from "../components/Table";

export default function Tables() {
	return (
		<>
			<div className="content">
				<Row>
					<Col md="12">
						<SimpleTable title={"Device Information"}
						             headers={[1, 2, 3, 4]}
						             data={[
							             [1, 2, 3, 4],
							             [1, 2, 3, 4],
							             [1, 2, 3, 4],
							             [1, 2, 3, 4]
						             ]}
						/>
					</Col>
				</Row>
			</div>
		</>
	);
}
