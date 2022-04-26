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

const OverviewTab = (props) => {
  const [employeeData, setEmployeeData] = useState([]);
  useEffect(() => {
    setEmployeeData(props.data);
  }, [props]);

  // console.log(employeeData, "overview");

  return employeeData !== undefined && employeeData !== [] ? (
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
                      <h6>Id:</h6>
                    </Col>
                    <Col xs={8}>
                      <p>{employeeData.employee_identifier}</p>
                    </Col>
                  </Row>
                </div>
                <div className="pb-3">
                  <Row>
                    <Col xs={4}>
                      <h6>Email:</h6>
                    </Col>
                    <Col xs={8}>
                      <p>{employeeData.emp_email}</p>
                    </Col>
                  </Row>
                </div>
                <div className="pb-3">
                  <Row>
                    <Col xs={4}>
                      <h6>Role:</h6>
                    </Col>
                    <Col xs={8}>
                      <p>{employeeData.emp_role}</p>
                    </Col>
                  </Row>
                </div>
                <div className="pb-3">
                  <Row>
                    <Col xs={4}>
                      <h6>Type:</h6>
                    </Col>
                    <Col xs={8}>
                      <p>{employeeData.emp_designation}</p>
                    </Col>
                  </Row>
                </div>
                <div className="pb-3">
                  <Row>
                    <Col xs={4}>
                      <h6>Phone:</h6>
                    </Col>
                    <Col xs={8}>
                      <p>{employeeData.emp_office_phone}</p>
                    </Col>
                  </Row>
                </div>
                <div className="pb-3">
                  <Row>
                    <Col xs={4}>
                      <h6>Joining Date:</h6>
                    </Col>
                    <Col xs={8}>
                      <p>
                        {moment(employeeData.emp_joining_date).format(
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
      </Row>
    </React.Fragment>
  ) : (
    ""
  );
};

export default OverviewTab;
