import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Button,
} from "reactstrap";
import moment from "moment";

const OverviewTab = (props) => {
  console.log(props, "props");
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="mb-0 h5">Employee Details</CardTitle>
            </CardHeader>
            <CardBody>
              <div>
                <div className="pb-3">
                  <Row>
                    <Col xs={4}>
                      <h6>Employee Id:</h6>
                    </Col>
                    <Col xs={8}>
                      <p>{props?.data?.employee_identifier}</p>
                    </Col>
                  </Row>
                </div>
                <div className="pb-3">
                  <Row>
                    <Col xs={4}>
                      <h6>Employee Email:</h6>
                    </Col>
                    <Col xs={8}>
                      <p>{props?.data?.emp_email}</p>
                    </Col>
                  </Row>
                </div>
                <div className="pb-3">
                  <Row>
                    <Col xs={4}>
                      <h6>Employee Role:</h6>
                    </Col>
                    <Col xs={8}>
                      <p>{props?.data?.emp_role}</p>
                    </Col>
                  </Row>
                </div>
                <div className="pb-3">
                  <Row>
                    <Col xs={4}>
                      <h6>Employee Type:</h6>
                    </Col>
                    <Col xs={8}>
                      <p>{props?.data?.emp_designation}</p>
                    </Col>
                  </Row>
                </div>
                <div className="pb-3">
                  <Row>
                    <Col xs={4}>
                      <h6>Employee Phone:</h6>
                    </Col>
                    <Col xs={8}>
                      <p>{props?.data?.emp_office_phone}</p>
                    </Col>
                  </Row>
                </div>
                <div className="pb-3">
                  <Row>
                    <Col xs={4}>
                      <h6>Employee Joining Date:</h6>
                    </Col>
                    <Col xs={8}>
                      <p>
                        {moment(props?.data?.emp_joining_date).format(
                          "DD-MM-YYYY"
                        )}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="mb-0 h5">Employee Mappings</CardTitle>
            </CardHeader>
            <CardBody>
              <div>
                <div className="pb-3">
                  <Row>
                    <Col xs={12}>
                      <h6>Employee Mapped To:</h6>
                    </Col>
                  </Row>
                </div>
                <div className="pb-3">
                  <Row className="align-middle">
                    <Col xs={12} className="border align-middle">
                      <div className="m-2">
                        <h5 className="badge badge-soft-primary m-1 p-1">
                          {props?.data?.emp_email}
                        </h5>
                        <h5 className="badge badge-soft-primary m-1 p-1">
                          {props?.data?.emp_email}
                        </h5>
                        <h5 className="badge badge-soft-primary m-1 p-1">
                          {props?.data?.emp_email}
                        </h5>
                        <h5 className="badge badge-soft-primary m-1 p-1">
                          {props?.data?.emp_email}
                        </h5>
                        <h5 className="badge badge-soft-primary m-1 p-1">
                          {props?.data?.emp_email}
                        </h5>
                        <h5 className="badge badge-soft-primary m-1 p-1">
                          {props?.data?.emp_email}
                        </h5>
                        <h5 className="badge badge-soft-primary m-1 p-1">
                          {props?.data?.emp_email}
                        </h5>
                        <h5 className="badge badge-soft-primary m-1 p-1">
                          {props?.data?.emp_email}
                        </h5>
                        <h5 className="badge badge-soft-primary m-1 p-1">
                          {props?.data?.emp_email}
                        </h5>
                        <h5 className="badge badge-soft-primary m-1 p-1">
                          {props?.data?.emp_email}
                        </h5>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Card className="shadow-sm">
        <CardHeader>
          <div className="d-flex">
            <div className="flex-grow-1">
              <CardTitle className="mb-0 h5">
                Employee Description Attchments
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div>
            <Row>
              <Col xl={4}>
                <Card className="p-1 mb-xl-0">
                  <div className="p-3">
                    <div className="d-flex align-items-start">
                      <div className="flex-grow-1 overflow-hidden">
                        <h5 className="font-size-14 text-truncate">
                          <Link to="#" className="text-dark">
                            {
                              props?.data?.asset_description_attachment?.split(
                                "/Employee/"
                              )[1]
                            }
                          </Link>
                        </h5>
                        <p className="font-size-13 text-muted mb-0">
                          {moment(props?.data?.alocation_start_date).format(
                            "DD-MM-YYYY"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div>
                      <Button
                        className="btn btn-primary bg-primary"
                        href={props?.data?.asset_description_attachment}
                        download
                      >
                        <i className="mdi mdi-download"></i> Download
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default OverviewTab;
