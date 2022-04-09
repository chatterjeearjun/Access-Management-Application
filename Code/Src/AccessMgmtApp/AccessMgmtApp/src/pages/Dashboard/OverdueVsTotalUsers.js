import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

import OverdueVsTotalUsersPieChart from "./OverdueVsTotalUsersPieChart";

const OverdueVsTotalUsers = () => {
  return (
    <React.Fragment>
      <Col xs={4}>
        <Card className="card-h-100">
          <CardBody>
            <div className="d-flex flex-wrap align-items-center mb-4">
              <h5 className="card-title me-2">
                Overdue Approvals - Total Users
              </h5>
            </div>

            <Row className="align-items-center">
              <div className="col-sm">
                <div id="wallet-balance" className="apex-charts">
                  <OverdueVsTotalUsersPieChart />
                </div>
              </div>
              <div className="col-sm align-self-center">
                <div className="mt-4 mt-sm-0">
                  <div>
                    <p className="mb-2">
                      <i className="mdi mdi-circle align-middle font-size-10 me-2 text-success"></i>{" "}
                      Overdue Approvals
                    </p>
                    <h6>127</h6>
                  </div>

                  <div className="mt-4 pt-2">
                    <p className="mb-2">
                      <i className="mdi mdi-circle align-middle font-size-10 me-2 text-primary"></i>{" "}
                      Total Users
                    </p>
                    <h6>205</h6>
                  </div>
                </div>
              </div>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default OverdueVsTotalUsers;
