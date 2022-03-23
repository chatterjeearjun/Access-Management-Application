import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { withRouter, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";

import { AvForm, AvField } from "availity-reactstrap-validation";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import {
  getApprovers as onGetApprovers,
  addNewApprover as onAddNewApprover,
  updateApprover as onUpdateApprover,
  deleteApprover as onDeleteApprover,
  getRoles as onGetRoles,
} from "../../store/actions";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
const AdminTeam = (props) => {
  const dispatch = useDispatch();

  const { approvers } = useSelector((state) => ({
    approvers: state.contacts.approvers,
  }));
  const { roles } = useSelector((state) => ({
    roles: state.contacts.roles,
  }));

  const [approverList, setApproverList] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize: approvers?.length, // replace later with size(approvers),
    custom: true,
  };

  const defaultSorted = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ];

  const selectRow = {
    mode: "checkbox",
  };

  const contactListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      formatter: (cellContent, approver) => <>{approver.id}</>,
    },
    {
      text: "Name",
      dataField: "approver_first_name",
      sort: true,
      formatter: (cellContent, approver) => (
        <>
          <h5 className="font-size-14 mb-1 text-dark">
            {approver.approver_first_name} {approver.approver_last_name}
          </h5>
          {/* <p className="text-muted mb-0">{approver.designation}</p> */}
        </>
      ),
    },
    {
      dataField: "approver_role",
      text: "User Role",
      sort: true,
    },
    {
      dataField: "approver_email",
      text: "User Email",
      sort: true,
    },
    {
      dataField: "created_date",
      text: "Start Date",
      sort: true,
      formatter: (cellContent, approver) => (
        <>{approver.created_date.split("T")[0]}</>
      ),
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (cellContent, approver) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleApproverClick(approver)}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => handleDeleteApprover(approver)}
            ></i>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (approvers && !approvers.length) {
      dispatch(onGetApprovers());
      setIsEdit(false);
    }
  }, [dispatch, approvers]);

  useEffect(() => {
    setApproverList(approvers);
    setIsEdit(false);
  }, [approvers]);

  useEffect(() => {
    if (roles && !roles.length) {
      dispatch(onGetRoles());
      setIsEdit(false);
    }
  }, [dispatch, roles]);

  useEffect(() => {
    setRolesList(roles);
    //setIsEdit(false);
  }, [roles]);

  const toggle = () => {
    setModal(!modal);
    if (!modal && !isEmpty(approvers) && !!isEdit) {
      setTimeout(() => {
        setApproverList(approvers);
        setIsEdit(false);
      }, 500);
    }
  };

  const handleApproverClick = (arg) => {
    const approver = arg;
    setApproverList({
      approveridentifier: approver.approver_identifier,
      companyidentifier: approver.company_identifier,
      fname: approver.approver_first_name,
      lname: approver.approver_last_name,
      designation: approver.approver_role,
      email: approver.approver_email,
      officephone: approver.approver_office_phone,
      mobile: approver.approver_mobile_number,
      startdate: approver.created_date.split("T")[0],
      status: approver.is_active,
    });
    setIsEdit(true);

    toggle();
  };

  const handleDeleteApprover = (approver) => {
    confirmAlert({
      title: "Deleting User",
      message: "Are you sure you want to delete this User?",
      buttons: [
        {
          label: "Delete",
          onClick: () => {
            dispatch(onDeleteApprover(approver));
          },
        },
        {
          label: "Cancel",
          onClick: () => {
            return false;
          },
        },
      ],
    });
  };

  /**
   * Handling submit approver on approver form
   */
  const handleValidApproverSubmit = (e, values) => {
    if (isEdit) {
      const updateApprover = {
        approver_identifier: approverList.approveridentifier,
        company_identifier: approverList.companyidentifier,
        approver_first_name: values["fname"],
        approver_last_name: values["lname"],
        approver_email: values["email"],
        approver_mobile_number: values["mobile"],
        approver_office_phone: values["mobile"],
        approver_role: values["designation"],
        is_active: approverList.status,
      };
      console.log(moment(values["startdate"]).format().slice(0, 19));
      // update approver
      dispatch(onUpdateApprover(updateApprover));
      setIsEdit(false);
    } else {
      const newApprover = {
        company_identifier: JSON.parse(localStorage.getItem("authUser"))
          .companyID,
        approver_first_name: values["fname"],
        approver_last_name: values["lname"],
        approver_email: values["email"],
        approver_mobile_number: values["mobile"],
        approver_office_phone: values["mobile"],
        approver_role: values["designation"],
      };
      // save new approver
      dispatch(onAddNewApprover(newApprover));
    }
    toggle();
  };
  const handleApproverClicks = () => {
    setApproverList("");
    setIsEdit(false);
    toggle();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Users | Crossleaf - Access Management</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Users" breadcrumbItem="Users List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={contactListColumns}
                    data={approvers}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={approvers}
                        columns={contactListColumns}
                        search
                      >
                        {(toolkitProps) => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <div className="row align-ite  ms-center">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <h5 className="card-title">
                                      Current Users{" "}
                                      <span className="text-muted fw-normal ms-2">
                                        ({approvers.length})
                                      </span>
                                    </h5>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                                    <div>
                                      <Link
                                        to="#"
                                        className="btn btn-light"
                                        onClick={handleApproverClicks}
                                      >
                                        <i className="bx bx-plus me-1"></i> Add
                                        User
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Col sm="4">
                                <div className="search-box ms-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps.searchProps} />
                                    <i className="bx bx-search-alt search-icon-search" />
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    keyField={"id"}
                                    responsive
                                    bordered={false}
                                    striped={false}
                                    defaultSorted={defaultSorted}
                                    selectRow={selectRow}
                                    classes={"table align-middle table-nowrap"}
                                    headerWrapperClasses={"thead-light"}
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                  />

                                  <Modal
                                    isOpen={modal}
                                    toggle={toggle}
                                    size="xl"
                                    scrollable={true}
                                  >
                                    <ModalHeader toggle={toggle} tag="h4">
                                      {!!isEdit ? "Edit User" : "Add User"}
                                    </ModalHeader>
                                    <ModalBody>
                                      <AvForm
                                        onValidSubmit={
                                          handleValidApproverSubmit
                                        }
                                      >
                                        <Row form>
                                          <Col xs={12}>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="fname"
                                                    label="First Name"
                                                    placeholder="user first name"
                                                    type="text"
                                                    errorMessage="please provide valid first name"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      approverList.fname || ""
                                                    }
                                                  />
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="lname"
                                                    label="Last Name"
                                                    placeholder="user last name"
                                                    type="text"
                                                    errorMessage="please provide valid last name"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      approverList.lname || ""
                                                    }
                                                  />
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="email"
                                                    label="User Email"
                                                    placeholder="acs@crossleaf.ca"
                                                    type="email"
                                                    errorMessage="please provide valid Email"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      approverList.email || ""
                                                    }
                                                  />
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="mobile"
                                                    label="User Phone"
                                                    type="tel"
                                                    placeholder="(999)999-9999"
                                                    errorMessage="please provide valid Phone Number"
                                                    maxlength="10"
                                                    validate={{
                                                      required: {
                                                        value: true,
                                                        tel: true,
                                                      },
                                                    }}
                                                    value={
                                                      approverList.mobile || ""
                                                    }
                                                  />
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    type="select"
                                                    name="designation"
                                                    className="form-select"
                                                    label="Role"
                                                    errorMessage="please select role"
                                                    multiple={false}
                                                    required
                                                    value={
                                                      approverList.designation ||
                                                      ""
                                                    }
                                                  >
                                                    <option value="">
                                                      select role
                                                    </option>
                                                    {rolesList.map((role) => (
                                                      <option
                                                        key={role.id}
                                                        value={role.role_name}
                                                      >
                                                        {role.role_name}
                                                      </option>
                                                    ))}
                                                  </AvField>
                                                </div>
                                              </Col>
                                              <Col xs={6}></Col>
                                            </Row>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col>
                                            <div className="text-end">
                                              <button
                                                type="submit"
                                                className="btn btn-success save-approver"
                                              >
                                                Save
                                              </button>
                                            </div>
                                          </Col>
                                        </Row>
                                      </AvForm>
                                    </ModalBody>
                                  </Modal>
                                </div>
                              </Col>
                            </Row>
                            <Row className="align-items-md-center mt-30">
                              <Col className="pagination pagination-rounded justify-content-end mb-2">
                                <PaginationListStandalone
                                  {...paginationProps}
                                />
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(AdminTeam);
