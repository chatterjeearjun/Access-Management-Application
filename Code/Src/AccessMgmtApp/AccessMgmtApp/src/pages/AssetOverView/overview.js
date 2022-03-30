import React, { useState } from "react";
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
import { ASSET_TO_EMP } from "../../helpers/url_helper";

const OverviewTab = (props) => {
  // const downloadFile = (file) => {
  //   saveAs(file, file?.split("/Asset/")[1]);
  // };
  const [employeeData, setEmployeedata] = useState([]);
  const assetid = window.location.search.slice(1);

  const empData = async () => {
    const res = await fetch(
      `https://localhost:5001${ASSET_TO_EMP(
        assetid,
        JSON.parse(localStorage.getItem("authUser")).companyID
      )}`,
      { method: "POST" }
    );
    const data = await res.json();
    setEmployeedata(data);
  };
  if (employeeData.length === 0 && props) {
    empData();
  }

  console.log(employeeData, "employeeData");
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="mb-0 h5">Asset Details</CardTitle>
            </CardHeader>
            <CardBody>
              <div>
                <div className="pb-3">
                  <Row>
                    <Col xs={4}>
                      <h6>Asset Id:</h6>
                    </Col>
                    <Col xs={8}>
                      <p>{props?.data?.asset_identifier}</p>
                    </Col>
                  </Row>
                </div>
                <div className="pb-3">
                  <Row>
                    <Col xs={4}>
                      <h6>Asset Name:</h6>
                    </Col>
                    <Col xs={8}>
                      <p>{props?.data?.asset_name}</p>
                    </Col>
                  </Row>
                </div>
                <div className="pb-3">
                  <Row>
                    <Col xs={4}>
                      <h6>Asset Type:</h6>
                    </Col>
                    <Col xs={8}>
                      <p>{props?.data?.asset_type}</p>
                    </Col>
                  </Row>
                </div>
                <div className="pb-3">
                  <Row>
                    <Col xs={4}>
                      <h6>Asset Owner:</h6>
                    </Col>
                    <Col xs={8}>
                      <p>{props?.data?.asset_owner}</p>
                    </Col>
                  </Row>
                </div>
                <div className="pb-3">
                  <Row>
                    <Col xs={4}>
                      <h6>Asset Description:</h6>
                    </Col>
                    <Col xs={8}>
                      <p>{props?.data?.asset_description}</p>
                    </Col>
                  </Row>
                </div>
                <div className="pb-3">
                  <Row>
                    <Col xs={4}>
                      <h6>Asset Location:</h6>
                    </Col>
                    <Col xs={8}>
                      <p>{props?.data?.asset_location}</p>
                    </Col>
                  </Row>
                </div>
                <div className="pb-3">
                  <Row>
                    <Col xs={4}>
                      <h6>First Active Date:</h6>
                    </Col>
                    <Col xs={8}>
                      <p>
                        {moment(props?.data?.alocation_start_date).format(
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
              <CardTitle className="mb-0 h5">Asset Mappings</CardTitle>
            </CardHeader>
            <CardBody>
              <div>
                <div className="pb-3">
                  <Row>
                    <Col xs={12}>
                      <h6>Asset Mapped To:</h6>
                    </Col>
                  </Row>
                </div>
                <div className="pb-3">
                  <Row className="align-middle">
                    <Col xs={12} className="border align-middle">
                      <div className="m-2">
                        {employeeData.map((data) => (
                          <>
                            <Link
                              to={`/EmployeeProfile?${data.employee_identifier}`}
                              className="badge badge-soft-primary m-1 p-1"
                              id={`mappings${data.id}`}
                            >
                              {data.emp_first_name} {data.emp_last_name}
                            </Link>
                            <UncontrolledTooltip
                              placement="top"
                              target={`mappings${data.id}`}
                            >
                              {data.emp_email}
                            </UncontrolledTooltip>
                          </>
                        ))}
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
                Asset Description Attchments
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
                                "/Asset/"
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
                        // onClick={downloadFile(
                        //   props?.data?.asset_description_attachment
                        // )}
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
