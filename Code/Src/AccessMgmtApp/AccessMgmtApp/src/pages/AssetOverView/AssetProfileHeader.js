import React, { useState } from "react";
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
import OverviewTab from "./overview";
import EmpToAssets from "./EmpToAssets";
import AssetAttachments from "./Attchmemnts";
import { ASSET_TO_EMP } from "../../helpers/url_helper";

const AssetInfo = (props) => {
  const [activeTab, toggleTab] = useState("1");
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
  if (employeeData.length === 0) {
    empData();
  }

  return (
    <React.Fragment>
      <Row>
        <Col xl={9} lg={8}>
          <Card className="shadow-sm">
            <CardBody>
              <Row>
                <div className="col-sm order-2 order-sm-1">
                  <div className="d-flex align-items-start mt-3 mt-sm-0">
                    <div className="flex-grow-1">
                      <div>
                        <h5 className="font-size-16 mb-1">
                          {props?.data?.asset_name}
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
                    Mappings
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
              <OverviewTab data={props?.data} />
            </TabPane>
            <TabPane tabId="2">
              <EmpToAssets data={employeeData} />
            </TabPane>
            <TabPane tabId="3">
              <AssetAttachments data={props?.data} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AssetInfo;
