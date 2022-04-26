import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

import TicketsPieChart from "./TicketsPieChart";

const TicketsPie = () => {
  return (
    <React.Fragment>
      <Col xl={6} md={8} lg={6} xs={12}>
        <Card className="card-h-100">
          <CardBody>
            <div className="d-flex flex-wrap align-items-center mb-4">
              <h5 className="card-title me-2">Tickets Status</h5>
            </div>

            <Row className="align-items-center">
              <div className="col-sm">
                <div id="wallet-balance" className="apex-charts">
                  <TicketsPieChart />
                </div>
              </div>
              <div className="col-sm align-self-center">
                <div className="mt-4 mt-sm-0">
                  <div>
                    <p className="mb-2">
                      <i
                        className="mdi mdi-circle align-middle font-size-10 me-2"
                        style={{ color: "#00b894" }}
                      ></i>{" "}
                      Tickets Raised {" - "}0
                    </p>
                  </div>

                  <div className="mt-4 pt-2">
                    <p className="mb-2">
                      <i
                        className="mdi mdi-circle align-middle font-size-10 me-2 "
                        style={{ color: "#19e9c0" }}
                      ></i>{" "}
                      Tickets Approved {" - "}0
                    </p>
                  </div>
                  <div className="mt-4 pt-2">
                    <p className="mb-2">
                      <i
                        className="mdi mdi-circle align-middle font-size-10 me-2"
                        style={{ color: "#d63031" }}
                      ></i>{" "}
                      Tickets Rejected {" - "}0
                    </p>
                  </div>
                  <div className="mt-4 pt-2">
                    <p className="mb-2">
                      <i
                        className="mdi mdi-circle align-middle font-size-10 me-2 "
                        style={{ color: "#e17055" }}
                      ></i>{" "}
                      Tickets Pending {" - "}0
                    </p>
                  </div>

                  <div className="mt-4 pt-2">
                    <p className="mb-2">
                      <i className="mdi mdi-circle align-middle font-size-10 me-2 text-primary"></i>{" "}
                      Tickets Overdue {" - "}0
                    </p>
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

export default TicketsPie;
