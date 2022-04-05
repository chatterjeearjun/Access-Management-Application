import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
import moment from "moment";

const EmpAttachments = (props) => {
  const [employeeData, setEmployeeData] = useState([]);
  useEffect(() => {
    setEmployeeData(props.data);
  }, [props]);

  console.log(employeeData, "overview");

  return employeeData !== undefined && employeeData !== [] ? (
    <React.Fragment>
      <Row>
        <Col>
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
                  {employeeData.emp_cert_document1 !== "" ? (
                    <Col xl={4}>
                      <Card className="p-1 mb-xl-0">
                        <div className="p-3">
                          <div className="d-flex align-items-start">
                            <div className="flex-grow-1 overflow-hidden">
                              <h5 className="font-size-14 text-truncate">
                                <Link to="#" className="text-dark">
                                  {
                                    employeeData.emp_cert_document1?.split(
                                      "/Employee/"
                                    )[1]
                                  }
                                </Link>
                              </h5>
                              <p className="font-size-13 text-muted mb-0">
                                {moment(employeeData.emp_joining_date).format(
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
                              href={employeeData.emp_cert_document1}
                              download
                            >
                              <i className="mdi mdi-download"></i> Download
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ) : (
                    ""
                  )}
                  {employeeData.emp_bc_document1 !== "" ? (
                    <Col xl={4}>
                      <Card className="p-1 mb-xl-0">
                        <div className="p-3">
                          <div className="d-flex align-items-start">
                            <div className="flex-grow-1 overflow-hidden">
                              <h5 className="font-size-14 text-truncate">
                                <Link to="#" className="text-dark">
                                  {
                                    employeeData.emp_bc_document1?.split(
                                      "/Employee/"
                                    )[1]
                                  }
                                </Link>
                              </h5>
                              <p className="font-size-13 text-muted mb-0">
                                {moment(employeeData.emp_joining_date).format(
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
                              href={employeeData.emp_bc_document1}
                              download
                            >
                              <i className="mdi mdi-download"></i> Download
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ) : (
                    ""
                  )}
                  {employeeData.emp_nda_document1 !== "" ? (
                    <Col xl={4}>
                      <Card className="p-1 mb-xl-0">
                        <div className="p-3">
                          <div className="d-flex align-items-start">
                            <div className="flex-grow-1 overflow-hidden">
                              <h5 className="font-size-14 text-truncate">
                                {
                                  employeeData.emp_nda_document1?.split(
                                    "/Employee/"
                                  )[1]
                                }
                              </h5>
                              <p className="font-size-13 text-muted mb-0">
                                {moment(employeeData.emp_joining_date).format(
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
                              href={employeeData.emp_nda_document1}
                              download
                            >
                              <i className="mdi mdi-download"></i> Download
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ) : (
                    ""
                  )}
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  ) : (
    ""
  );
};

export default EmpAttachments;
