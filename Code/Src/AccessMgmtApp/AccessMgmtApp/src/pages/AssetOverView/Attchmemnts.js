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

const AssetAttachments = (props) => {
  return (
    <React.Fragment>
      <Row>
        <Col>
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
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AssetAttachments;
