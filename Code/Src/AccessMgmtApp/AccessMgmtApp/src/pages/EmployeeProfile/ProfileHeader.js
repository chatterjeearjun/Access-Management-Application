import React from "react";
import {
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import OverviewTab from "./Overview";
import avatar from "../../assets/images/users/avatar-1.jpg";
const EmployeeProfileHeader = (props) => {
  console.log(props, "propsinfo");
  return (
    <React.Fragment>
      <Row>
        <Col xl={9} lg={8}>
          <Card className="shadow-sm">
            <CardBody>
              <Row>
                <div className="col-sm order-2 order-sm-1">
                  <div className="d-flex align-items-start mt-3 mt-sm-0">
                    <div className="flex-shrink-0">
                      <div className="avatar-xl me-3">
                        <img
                          src={avatar}
                          alt="no profile pic"
                          className="img-fluid rounded-circle d-block"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <div>
                        <h5 className="font-size-16 mb-1">
                          {`${props?.data?.emp_first_name} ${props?.data?.emp_last_name}`}
                        </h5>

                        <div className="d-flex flex-wrap align-items-start gap-2 gap-lg-3 text-muted font-size-13">
                          <div>
                            <i
                              className={`mdi mdi-circle-medium me-1 ${
                                props?.data?.is_active === true
                                  ? "text-success"
                                  : "text-danger"
                              } align-middle`}
                            ></i>
                            {props?.data?.is_active === true
                              ? "Active"
                              : "Not Active"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>

              <Nav className="nav-tabs-custom card-header-tabs border-top mt-4">
                <NavItem>
                  <NavLink
                    to="#"
                    className={classnames(
                      {
                        active: true,
                      },
                      "px-3"
                    )}
                  >
                    Overview
                  </NavLink>
                </NavItem>
              </Nav>
            </CardBody>
          </Card>
          <TabContent activeTab={"1"}>
            <TabPane tabId="1">
              <OverviewTab data={props?.data} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EmployeeProfileHeader;
