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
import "./callout.css";
import moment from "moment";
import { saveAs } from "file-saver";

const OverviewTab = (props) => {
  // const downloadFile = (file) => {
  //   saveAs(file, file?.split("/Asset/")[1]);
  // };

  console.log(props, "props");
  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <CardTitle className="mb-0">Asset Details</CardTitle>
        </CardHeader>
        <CardBody>
          <div>
            <div className="pb-3">
              <Row>
                <Col xs={12}>
                  <div className="bd-callout bd-callout-default">
                    <h6>Asset Id</h6>
                    <h4>{props?.data?.asset_identifier}</h4>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="pb-3">
              <Row>
                <Col xs={12}>
                  <div className="bd-callout bd-callout-default">
                    <h6>Asset Name</h6>
                    <h4>{props?.data?.asset_name}</h4>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="pb-3">
              <Row>
                <Col xs={12}>
                  <div className="bd-callout bd-callout-default">
                    <h6>Asset Type</h6>
                    <h4>{props?.data?.asset_type}</h4>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="pb-3">
              <Row>
                <Col xs={12}>
                  <div className="bd-callout bd-callout-default">
                    <h6>Asset Owner</h6>
                    <h4>{props?.data?.asset_owner}</h4>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="pb-3">
              <Row>
                <Col xs={12}>
                  <div className="bd-callout bd-callout-default">
                    <h6>Asset Description</h6>
                    <h4>{props?.data?.asset_description}</h4>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="pb-3">
              <Row>
                <Col xs={12}>
                  <div className="bd-callout bd-callout-default">
                    <h6>Asset Location</h6>
                    <h4>{props?.data?.asset_location}</h4>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="pb-3">
              <Row>
                <Col xs={12}>
                  <div className="bd-callout bd-callout-default">
                    <h6>Asset First Active Date</h6>
                    <h4>
                      {moment(props?.data?.alocation_start_date).format(
                        "DD-MM-YYYY"
                      )}
                    </h4>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className="d-flex">
            <div className="flex-grow-1">
              <CardTitle className="mb-0">
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
