import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

import UsersApprovalPieChart from "./UsersApprovalPieChart";

import { Link } from "react-router-dom";

const UsersApproval = (props) => {
  console.log(props, "usersapproval pie");
  return (
    <React.Fragment>
      <Col xl={6} md={6} lg={6} xs={6}>
        <Card className="card-h-100">
          <CardBody>
            <div className="d-flex flex-wrap align-items-center mb-4">
              <h5 className="card-title me-2">Users Approval Status</h5>
            </div>

            <Row className="align-items-center">
              <div className="col-sm">
                <div id="wallet-balance" className="apex-charts">
                  <UsersApprovalPieChart
                    data={props?.data ? props?.data : []}
                  />
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
                      <Link
                        to={`${
                          props?.data?.monthlyEmployeeAdded !== 0
                            ? `/EmployeeManagement?date=${props?.dateRange[0]},${props?.dateRange[1]}&type=uAdded`
                            : "#"
                        }`}
                        className="text-dark"
                      >
                        users added{" - "}
                        {props?.data?.monthlyEmployeeAdded}
                      </Link>
                    </p>
                  </div>
                  <div className="mt-4 pt-2">
                    <p className="mb-2">
                      <i
                        className="mdi mdi-circle align-middle font-size-10 me-2 "
                        style={{ color: "#19e9c0" }}
                      ></i>{" "}
                      <Link
                        to={`${
                          props?.data?.approvedEmployees !== 0
                            ? `/EmployeeManagement?date=${props?.dateRange[0]},${props?.dateRange[1]}&type=uApproved`
                            : "#"
                        }`}
                        className="text-dark"
                      >
                        users approved {" - "}
                        {props?.data?.approvedEmployees}
                      </Link>
                    </p>
                  </div>
                  <div className="mt-4 pt-2">
                    <p className="mb-2">
                      <i
                        className="mdi mdi-circle align-middle font-size-10 me-2 "
                        style={{ color: "#d63031" }}
                      ></i>{" "}
                      <Link
                        to={`${
                          props?.data?.rejectedEmployees !== 0
                            ? `/EmployeeManagement?date=${props?.dateRange[0]},${props?.dateRange[1]}&type=uRejected`
                            : "#"
                        }`}
                        className="text-dark"
                      >
                        users rejected{" - "}
                        {props?.data?.rejectedEmployees}
                      </Link>
                    </p>
                  </div>
                  <div className="mt-4 pt-2">
                    <p className="mb-2">
                      <i
                        className="mdi mdi-circle align-middle font-size-10 me-2 "
                        style={{ color: "#e17055" }}
                      ></i>{" "}
                      <Link
                        to={`${
                          props?.data?.pendingEmployees !== 0
                            ? `/EmployeeManagement?date=${props?.dateRange[0]},${props?.dateRange[1]}&type=uPending`
                            : "#"
                        }`}
                        className="text-dark"
                      >
                        approval pending{" - "}
                        {props?.data?.pendingEmployees}
                      </Link>
                    </p>
                  </div>
                  <div className="mt-4 pt-2">
                    <p className="mb-2">
                      <i className="mdi mdi-circle align-middle font-size-10 me-2 text-primary"></i>{" "}
                      <Link
                        to={`${
                          props?.data?.overdueEmployees !== 0
                            ? `/EmployeeManagement?date=${props?.dateRange[0]},${props?.dateRange[1]}&type=uOverdue`
                            : "#"
                        }`}
                        className="text-dark"
                      >
                        approval over due{" - "}
                        {props?.data?.overdueEmployees}
                      </Link>
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

export default UsersApproval;
