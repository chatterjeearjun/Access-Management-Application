import React, { useEffect, useState } from "react";
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
import AssetsToEmp from "./AssetsToEmp";
import EmpAttachments from "./Attachments";

const EmployeeProfileHeader = (props) => {
  const [employeeData, setEmployeeData] = useState([]);
  const [activeTab, toggleTab] = useState("1");

  useEffect(() => {
    setEmployeeData(props.data);
  }, [props]);

  return employeeData !== undefined && employeeData !== [] ? (
    <React.Fragment>
      <Row>
        <Col xl={9} lg={8}>
          <Card className="shadow-sm">
            <CardBody>
              <Row>
                <div className="col-sm order-2 order-sm-1">
                  <div className="d-flex align-items-start mt-3 mt-sm-0">
                    <div className="flex-shrink-1">
                      <div className="avatar-xl me-3">
                        <img
                          src={`${employeeData.emp_profile_picture}`}
                          alt="no profile pic"
                          className="img-fluid rounded-circle shadow-4"
                          style={{ borderRadius: "50% !important" }}
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <div>
                        <h5 className="font-size-16 mb-1">
                          {`${employeeData.emp_first_name} ${employeeData.emp_last_name}`}
                        </h5>

                        <div className="d-flex flex-wrap align-items-start gap-2 gap-lg-3 text-muted font-size-13">
                          <div>
                            <i
                              className={`mdi mdi-circle-medium me-1 ${
                                employeeData.is_active === true
                                  ? "text-success"
                                  : "text-danger"
                              } align-middle`}
                            ></i>
                            {employeeData.is_active === true
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
                        active: activeTab === "1",
                      },
                      "px-3"
                    )}
                    onClick={() => {
                      toggleTab("1");
                    }}
                  >
                    Overview
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    className={classnames(
                      {
                        active: activeTab === "2",
                      },
                      "px-3"
                    )}
                    onClick={() => {
                      toggleTab("2");
                    }}
                  >
                    Asset Mappings
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    className={classnames(
                      {
                        active: activeTab === "3",
                      },
                      "px-3"
                    )}
                    onClick={() => {
                      toggleTab("3");
                    }}
                  >
                    Attachments
                  </NavLink>
                </NavItem>
              </Nav>
            </CardBody>
          </Card>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <OverviewTab data={employeeData} />
            </TabPane>
            <TabPane tabId="2">
              <AssetsToEmp data={employeeData} />
            </TabPane>
            <TabPane tabId="3">
              <EmpAttachments data={employeeData} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </React.Fragment>
  ) : (
    ""
  );
};

export default EmployeeProfileHeader;
