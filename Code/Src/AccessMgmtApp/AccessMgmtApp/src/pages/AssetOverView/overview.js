import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import "./callout.css";

const OverviewTab = (props) => {
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
                    <h4>{props?.data?.alocation_start_date}</h4>
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
                            Beautiful Day with Friends
                          </Link>
                        </h5>
                        <p className="font-size-13 text-muted mb-0">
                          10 Apr, 2020
                        </p>
                      </div>
                      <div className="flex-shrink-0 ms-2">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn btn-link text-muted font-size-16 p-1 py-0 shadow-none"
                            tag="a"
                          >
                            <i className="bx bx-dots-horizontal-rounded"></i>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <li>
                              <DropdownItem to="#">Action</DropdownItem>
                            </li>
                            <li>
                              <DropdownItem to="#">Another action</DropdownItem>
                            </li>
                            <li>
                              <DropdownItem to="#">
                                Something else here
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>

                  <div className="position-relative">
                    <img src={"img1"} alt="" className="img-thumbnail" />
                  </div>

                  <div className="p-3">
                    <ul className="list-inline">
                      <li className="list-inline-item me-3">
                        <Link to="#" className="text-muted">
                          <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"></i>{" "}
                          Project
                        </Link>
                      </li>
                      <li className="list-inline-item me-3">
                        <Link to="#" className="text-muted">
                          <i className="bx bx-comment-dots align-middle text-muted me-1"></i>{" "}
                          12 Comments
                        </Link>
                      </li>
                    </ul>
                    <p className="text-muted">
                      Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                      amet
                    </p>

                    <div>
                      <Link to="/contacts-list" className="text-primary">
                        Read more <i className="mdi mdi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col xl={4}>
                <Card className="p-1 mb-xl-0">
                  <div className="p-3">
                    <div className="d-flex align-items-start">
                      <div className="flex-grow-1 overflow-hidden">
                        <h5 className="font-size-14 text-truncate">
                          <Link to="#" className="text-dark">
                            Drawing a sketch
                          </Link>
                        </h5>
                        <p className="font-size-13 text-muted mb-0">
                          24 Mar, 2020
                        </p>
                      </div>
                      <div className="flex-shrink-0 ms-2">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn btn-link text-muted font-size-16 p-1 py-0 shadow-none"
                            tag="a"
                          >
                            <i className="bx bx-dots-horizontal-rounded"></i>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <li>
                              <DropdownItem to="#">Action</DropdownItem>
                            </li>
                            <li>
                              <DropdownItem to="#">Another action</DropdownItem>
                            </li>
                            <li>
                              <DropdownItem to="#">
                                Something else here
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>

                  <div className="position-relative">
                    <img src={"img2"} alt="" className="img-thumbnail" />
                  </div>

                  <div className="p-3">
                    <ul className="list-inline">
                      <li className="list-inline-item me-3">
                        <Link to="#" className="text-muted">
                          <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"></i>{" "}
                          Development
                        </Link>
                      </li>
                      <li className="list-inline-item me-3">
                        <Link to="#" className="text-muted">
                          <i className="bx bx-comment-dots align-middle text-muted me-1"></i>{" "}
                          08 Comments
                        </Link>
                      </li>
                    </ul>
                    <p className="text-muted">
                      At vero eos et accusamus et iusto odio dignissimos ducimus
                      quos
                    </p>

                    <div>
                      <Link to="/contacts-list" className="text-primary">
                        Read more <i className="mdi mdi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col xl={4}>
                <Card className="p-1 mb-sm-0">
                  <div className="p-3">
                    <div className="d-flex align-items-start">
                      <div className="flex-grow-1 overflow-hidden">
                        <h5 className="font-size-14 text-truncate">
                          <Link to="#" className="text-dark">
                            Project discussion with team
                          </Link>
                        </h5>
                        <p className="font-size-13 text-muted mb-0">
                          20 Mar, 2020
                        </p>
                      </div>
                      <div className="flex-shrink-0 ms-2">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn btn-link text-muted font-size-16 p-1 py-0 shadow-none"
                            tag="a"
                          >
                            <i className="bx bx-dots-horizontal-rounded"></i>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <li>
                              <DropdownItem to="#">Action</DropdownItem>
                            </li>
                            <li>
                              <DropdownItem to="#">Another action</DropdownItem>
                            </li>
                            <li>
                              <DropdownItem to="#">
                                Something else here
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>

                  <div className="position-relative">
                    <img src={"img3"} alt="" className="img-thumbnail" />
                  </div>

                  <div className="p-3">
                    <ul className="list-inline">
                      <li className="list-inline-item me-3">
                        <Link to="#" className="text-muted">
                          <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"></i>{" "}
                          Project
                        </Link>
                      </li>
                      <li className="list-inline-item me-3">
                        <Link to="#" className="text-muted">
                          <i className="bx bx-comment-dots align-middle text-muted me-1"></i>{" "}
                          08 Comments
                        </Link>
                      </li>
                    </ul>
                    <p className="text-muted">
                      Itaque earum rerum hic tenetur a sapiente delectus ut aut
                    </p>

                    <div>
                      <Link to="/contacts-list" className="text-primary">
                        Read more <i className="mdi mdi-arrow-right"></i>
                      </Link>
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
