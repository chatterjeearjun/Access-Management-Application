import React, { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import moment from "moment";
import { ASSET_TO_EMP } from "../../helpers/url_helper";

const OverviewTab = (props) => {
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
      </Row>
    </React.Fragment>
  );
};

export default OverviewTab;
