import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  UncontrolledTooltip,
} from "reactstrap";

const AssetsToEmp = (props) => {
  const [employeeData, setEmployeeData] = useState([]);
  useEffect(() => {
    setEmployeeData(props.data);
  }, [props]);

  return employeeData !== undefined && employeeData !== [] ? (
    <React.Fragment>
      <Row>
        <Col>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="mb-0 h5">
                {employeeData.emp_first_name} {employeeData.emp_last_name}{" "}
                Mapped To{" "}
                {employeeData.associated_assets?.length > 0
                  ? JSON.parse(employeeData.associated_assets)?.length
                  : 0}{" "}
                Assets:
              </CardTitle>
            </CardHeader>
            <CardBody className="align-middle mx-auto">
              <div>
                <div className="pb-3">
                  <Row className="align-middle">
                    <Col className="align-middle">
                      <div className="m-2">
                        {employeeData.associated_assets?.length > 0
                          ? JSON.parse(employeeData.associated_assets).map(
                              (asset) => {
                                return (
                                  <>
                                    <Link
                                      to={`/AssetOverview?${asset?.Value}`}
                                      className="badge badge-soft-primary m-1 p-2 h6"
                                      id={`asset${asset?.Value?.split("-")[1]}`}
                                    >
                                      {asset?.Key}
                                    </Link>
                                    <UncontrolledTooltip
                                      placement="top"
                                      target={`asset${
                                        asset?.Value?.split("-")[1]
                                      }`}
                                    >
                                      {asset?.Value}
                                    </UncontrolledTooltip>
                                  </>
                                );
                              }
                            )
                          : ""}
                      </div>
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

export default AssetsToEmp;
