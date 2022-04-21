import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardBody,
} from "reactstrap";
import classnames from "classnames";

//SimpleBar
import SimpleBar from "simplebar-react";

const ApprovalStatusList = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <React.Fragment>
      <div className="col-xl-8">
        <div className="card">
          <div className="card-header align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">
              Expirations & Approvals Summary
            </h4>
            <div className="flex-shrink-0">
              <Nav
                className="justify-content-end nav-tabs-custom rounded card-header-tabs"
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Users Overdue
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Audits Overdue
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      toggle("3");
                    }}
                  >
                    Tickets Overdue
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "4" })}
                    onClick={() => {
                      toggle("4");
                    }}
                  >
                    Audit Approval Overdue
                  </NavLink>
                </NavItem> */}
              </Nav>
            </div>
          </div>

          <CardBody className="px-0">
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <SimpleBar
                  className="table-responsive px-3"
                  style={{ maxHeight: "352px" }}
                >
                  <table className="table align-middle table-nowrap table-borderless">
                    <tbody>
                      <tr>
                        <td style={{ width: "50px" }}>
                          <div className="font-size-22 text-danger">
                            <i className="bx bxs-user-x d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">Anil Bhaskar</h5>
                            <p className="text-muted mb-0 font-size-12">
                              14 Mar, 2022
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              anilbhaskar@crossleaf.ca
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Email
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              Daniel
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Approver
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              No Proper Documents
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Reason
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">Pending</h5>
                            <p className="text-muted mb-0 font-size-12">
                              Status
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "50px" }}>
                          <div className="font-size-22 text-danger">
                            <i className="bx bxs-user-x d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">Nagesh Raja</h5>
                            <p className="text-muted mb-0 font-size-12">
                              14 Feb, 2022
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              nagesh@crossleaf.ca
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Email
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              Daneil
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Approver
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              Incorrect Background Certificate
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Reason
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">Pending</h5>
                            <p className="text-muted mb-0 font-size-12">
                              Status
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "50px" }}>
                          <div className="font-size-22 text-danger">
                            <i className="bx bxs-user-x d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">Kushi</h5>
                            <p className="text-muted mb-0 font-size-12">
                              14 Mar, 2022
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              kushi@crossleaf.ca
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Email
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              Daniel
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Approver
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              No Proper Documents
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Reason
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">Rejected</h5>
                            <p className="text-muted mb-0 font-size-12">
                              Status
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "50px" }}>
                          <div className="font-size-22 text-danger">
                            <i className="bx bxs-user-x d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">Arjun</h5>
                            <p className="text-muted mb-0 font-size-12">
                              7 Mar, 2022
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              arjun@crossleaf.ca
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Email
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              Daniel
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Approver
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              Reason No Documents Attached
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Reason
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">Expired</h5>
                            <p className="text-muted mb-0 font-size-12">
                              Status
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "50px" }}>
                          <div className="font-size-22 text-danger">
                            <i className="bx bxs-user-x d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">Deep </h5>
                            <p className="text-muted mb-0 font-size-12">
                              14 Mar, 2022
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              deep@crossleaf.ca
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Email
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              Daniel
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Approver
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              Reason No Proper Documents
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Reason
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">Rejected</h5>
                            <p className="text-muted mb-0 font-size-12">
                              Status
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </SimpleBar>
              </TabPane>

              <TabPane tabId="2">
                <SimpleBar
                  className="table-responsive px-3"
                  style={{ maxHeight: "352px" }}
                >
                  <table className="table align-middle table-nowrap table-borderless">
                    <tbody>
                      <tr>
                        <td style={{ width: "50px" }}>
                          <div className="font-size-22 text-danger">
                            <i className="bx bxs-error-alt d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">Anil Bhaskar</h5>
                          </div>
                          <p className="text-muted mb-0 font-size-12">Name</p>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              anilbhaskar@crossleaf.ca
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Email
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              14 Mar, 2021
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Requested Date
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              14 Mar, 2022
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Due Date
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "50px" }}>
                          <div className="font-size-22 text-danger">
                            <i className="bx bxs-error-alt d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">Anil Bhaskar</h5>
                          </div>
                          <p className="text-muted mb-0 font-size-12">Name</p>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              anilbhaskar@crossleaf.ca
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Email
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              14 Mar, 2021
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Requested Date
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              14 Mar, 2022
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Due Date
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "50px" }}>
                          <div className="font-size-22 text-danger">
                            <i className="bx bxs-error-alt d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">Anil Bhaskar</h5>
                          </div>
                          <p className="text-muted mb-0 font-size-12">Name</p>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              anilbhaskar@crossleaf.ca
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Email
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              14 Mar, 2021
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Requested Date
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              14 Mar, 2022
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Due Date
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "50px" }}>
                          <div className="font-size-22 text-danger">
                            <i className="bx bxs-error-alt d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">Anil Bhaskar</h5>
                          </div>
                          <p className="text-muted mb-0 font-size-12">Name</p>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              anilbhaskar@crossleaf.ca
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Email
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              14 Mar, 2021
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Requested Date
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              14 Mar, 2022
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Due Date
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "50px" }}>
                          <div className="font-size-22 text-danger">
                            <i className="bx bxs-error-alt d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">Anil Bhaskar</h5>
                          </div>
                          <p className="text-muted mb-0 font-size-12">Name</p>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              anilbhaskar@crossleaf.ca
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Email
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              14 Mar, 2021
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Requested Date
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              14 Mar, 2022
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Due Date
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </SimpleBar>
              </TabPane>

              <TabPane tabId="3">
                <SimpleBar
                  className="table-responsive px-3"
                  style={{ maxHeight: "352px" }}
                >
                  <table className="table align-middle table-nowrap table-borderless">
                    <tbody>
                      <tr>
                        <td>
                          <div className="font-size-22 text-danger">
                            <i className="bx bxs-error-alt d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">
                              Need to approve new employee with L3 access
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              ticket Description
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              anilbhaskar@crossleaf.ca
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              User Email
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              Daniel
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Approver
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              01 Apr 2022
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Raised Date
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              6 Apr 2022
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Due Date
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="font-size-22 text-danger">
                            <i className="bx bxs-error-alt d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">
                              Need to approve new employee with L3 access
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              ticket Description
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              anilbhaskar@crossleaf.ca
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              User Email
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              Daniel
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Approver
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              01 Apr 2022
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Raised Date
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              6 Apr 2022
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Due Date
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="font-size-22 text-danger">
                            <i className="bx bxs-error-alt d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">
                              Need to approve new employee with L3 access
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              ticket Description
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              anilbhaskar@crossleaf.ca
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              User Email
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              Daniel
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Approver
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              01 Apr 2022
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Raised Date
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              6 Apr 2022
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Due Date
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="font-size-22 text-danger">
                            <i className="bx bxs-error-alt d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">
                              Need to approve new employee with L3 access
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              ticket Description
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              anilbhaskar@crossleaf.ca
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              User Email
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              Daniel
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Approver
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              01 Apr 2022
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Raised Date
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              6 Apr 2022
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Due Date
                            </p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="font-size-22 text-danger">
                            <i className="bx bxs-error-alt d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">
                              Need to approve new employee with L3 access
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              ticket Description
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-0">
                              anilbhaskar@crossleaf.ca
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              User Email
                            </p>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              Daniel
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Approver
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              01 Apr 2022
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Raised Date
                            </p>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h5 className="font-size-14 text-muted mb-0">
                              6 Apr 2022
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Due Date
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </SimpleBar>
              </TabPane>
              {/* <TabPane tabId="4">
                <SimpleBar
                  className="table-responsive px-3"
                  style={{ maxHeight: "352px" }}
                >
                  <table className="table align-middle table-nowrap table-borderless">
                    <tbody>
                      <tr>
                        <td>
                          <div className="font-size-22 text-danger">
                            <i className="bx bx-up-arrow-circle d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">Sell ETH</h5>
                            <p className="text-muted mb-0 font-size-12">
                              15 Mar, 2021
                            </p>
                          </div>
                        </td>

                        <td>
                          <div >
                            <h5 className="font-size-14 mb-0">0.56 ETH</h5>
                            <p className="text-muted mb-0 font-size-12">
                              Coin Value
                            </p>
                          </div>
                        </td>

                        <td>
                          <div >
                            <h5 className="font-size-14 text-muted mb-0">
                              $112.34
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Amount
                            </p>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td style={{ width: "50px" }}>
                          <div className="font-size-22 text-danger">
                            <i className="bx bx-up-arrow-circle d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">Sell BTC</h5>
                            <p className="text-muted mb-0 font-size-12">
                              14 Mar, 2021
                            </p>
                          </div>
                        </td>

                        <td>
                          <div >
                            <h5 className="font-size-14 mb-0">0.016 BTC</h5>
                            <p className="text-muted mb-0 font-size-12">
                              Coin Value
                            </p>
                          </div>
                        </td>

                        <td>
                          <div >
                            <h5 className="font-size-14 text-muted mb-0">
                              $125.20
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Amount
                            </p>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="font-size-22 text-danger">
                            <i className="bx bx-up-arrow-circle d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">Sell BTC</h5>
                            <p className="text-muted mb-0 font-size-12">
                              18 Mar, 2021
                            </p>
                          </div>
                        </td>

                        <td>
                          <div >
                            <h5 className="font-size-14 mb-0">0.018 BTC</h5>
                            <p className="text-muted mb-0 font-size-12">
                              Coin Value
                            </p>
                          </div>
                        </td>

                        <td>
                          <div >
                            <h5 className="font-size-14 text-muted mb-0">
                              $145.80
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Amount
                            </p>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="font-size-22 text-danger">
                            <i className="bx bx-up-arrow-circle d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">Sell ETH</h5>
                            <p className="text-muted mb-0 font-size-12">
                              15 Mar, 2021
                            </p>
                          </div>
                        </td>

                        <td>
                          <div >
                            <h5 className="font-size-14 mb-0">0.56 ETH</h5>
                            <p className="text-muted mb-0 font-size-12">
                              Coin Value
                            </p>
                          </div>
                        </td>

                        <td>
                          <div >
                            <h5 className="font-size-14 text-muted mb-0">
                              $112.34
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Amount
                            </p>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="font-size-22 text-danger">
                            <i className="bx bx-up-arrow-circle d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">Sell LTC</h5>
                            <p className="text-muted mb-0 font-size-12">
                              16 Mar, 2021
                            </p>
                          </div>
                        </td>

                        <td>
                          <div >
                            <h5 className="font-size-14 mb-0">1.88 LTC</h5>
                            <p className="text-muted mb-0 font-size-12">
                              Coin Value
                            </p>
                          </div>
                        </td>

                        <td>
                          <div >
                            <h5 className="font-size-14 text-muted mb-0">
                              $94.22
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Amount
                            </p>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className="font-size-22 text-danger">
                            <i className="bx bx-up-arrow-circle d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">Sell ETH</h5>
                            <p className="text-muted mb-0 font-size-12">
                              17 Mar, 2021
                            </p>
                          </div>
                        </td>

                        <td>
                          <div >
                            <h5 className="font-size-14 mb-0">0.42 ETH</h5>
                            <p className="text-muted mb-0 font-size-12">
                              Coin Value
                            </p>
                          </div>
                        </td>

                        <td>
                          <div >
                            <h5 className="font-size-14 text-muted mb-0">
                              $84.32
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Amount
                            </p>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td style={{ width: "50px" }}>
                          <div className="font-size-22 text-danger">
                            <i className="bx bx-up-arrow-circle d-block"></i>
                          </div>
                        </td>

                        <td>
                          <div>
                            <h5 className="font-size-14 mb-1">Sell BTC</h5>
                            <p className="text-muted mb-0 font-size-12">
                              14 Mar, 2021
                            </p>
                          </div>
                        </td>

                        <td>
                          <div >
                            <h5 className="font-size-14 mb-0">0.016 BTC</h5>
                            <p className="text-muted mb-0 font-size-12">
                              Coin Value
                            </p>
                          </div>
                        </td>

                        <td>
                          <div >
                            <h5 className="font-size-14 text-muted mb-0">
                              $125.20
                            </h5>
                            <p className="text-muted mb-0 font-size-12">
                              Amount
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </SimpleBar>
              </TabPane> */}
            </TabContent>
          </CardBody>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ApprovalStatusList;
