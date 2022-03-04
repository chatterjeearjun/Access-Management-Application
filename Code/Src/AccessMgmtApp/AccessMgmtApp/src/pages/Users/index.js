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
  Nav,
  NavItem,
  NavLink,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";

import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";

import { AvForm, AvField } from "availity-reactstrap-validation";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

import * as images from "../../assets/images";
import InputMask from "react-input-mask";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  getUsers as onGetUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
} from "../../store/actions";
import { isEmpty, size, map } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";

const Users = (props) => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => ({
    users: state.contacts.users,
  }));

  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize: users.length, // replace later with size(users),
    custom: true,
  };

  const defaultSorted = [
    {
      dataField: "employeeId", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ];

  const selectRow = {
    mode: "checkbox",
  };

  const contactListColumns = [
    {
      text: "id",
      dataField: "employeeId",
      sort: true,
      hidden: true,
      formatter: (cellContent, user) => <>{user.employeeId}</>,
    },
    {
      text: "Name",
      dataField: "name",
      sort: true,
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {user.employeeName}
            </Link>
          </h5>
          {/* <p className="text-muted mb-0">{user.designation}</p> */}
        </>
      ),
    },
    {
      dataField: "gender",
      text: "Designation",
      sort: true,
    },
    {
      dataField: "currentAddress",
      text: "Email",
      sort: true,
    },
    {
      dataField: "dateOfBirth",
      text: "Start Date",
      sort: true,
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (cellContent, user) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleUserClick(user)}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => handleDeleteUser(user)}
            ></i>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers());
      setIsEdit(false);
    }
  }, [dispatch, users]);

  useEffect(() => {
    setUserList(users);
    setIsEdit(false);
  }, [users]);

  const toggle = () => {
    setModal(!modal);
    if (!modal && !isEmpty(users) && !!isEdit) {
      setTimeout(() => {
        setUserList(users);
        setIsEdit(false);
      }, 500);
    }
  };

  const handleUserClick = (arg) => {
    const user = arg;

    setUserList({
      id: user.employeeId,
      name: user.employeeName,
      designation: user.gender,
      email: user.currentAddress,
      startdate: user.dateOfBirth,
      projects: user.projects,
    });
    setIsEdit(true);

    toggle();
  };

  const handleDeleteUser = (user) => {
    dispatch(onDeleteUser(user));
  };
  function getRandomString(length) {
    var randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }

  /**
   * Handling submit user on user form
   */
  const handleValidUserSubmit = (e, values) => {
    if (isEdit) {
      const updateUser = {
        id: userList.employeeId,
        name: values.employeeName,
        designation: values.gender,
        email: values.currentAddress,
        startdate: values.dateOfBirth,
        projects: values.projects,
      };

      // update user
      dispatch(onUpdateUser(updateUser));
      setIsEdit(false);
    } else {
      const newUser = {
        employeeId: Math.floor(Math.random() * (30 - 20)) + 20,
        employeeName: values["name"],
        dateOfBirth: values["startdate"].toString(),
        gender: values["designation"],
        currentAddress: values["email"],
        permanentAddress: getRandomString(10),
        city: getRandomString(6),
        nationality: "India",
        pinCode: getRandomString(6),
      };
      // save new user
      dispatch(onAddNewUser(newUser));
    }
    toggle();
  };
  const handleUserClicks = () => {
    setUserList("");
    setIsEdit(false);
    toggle();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Users List | Crossleaf - Access Management</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Users" breadcrumbItem="User List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="employeeId"
                    columns={contactListColumns}
                    data={users}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="employeeId"
                        data={users}
                        columns={contactListColumns}
                        bootstrap4
                        search
                      >
                        {(toolkitProps) => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <div className="row align-ite  ms-center">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <h5 className="card-title">
                                      Users List{" "}
                                      <span className="text-muted fw-normal ms-2">
                                        ({users.length})
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
                                        onClick={handleUserClicks}
                                      >
                                        <i className="bx bx-plus me-1"></i> Add
                                        New
                                      </Link>
                                    </div>

                                    <UncontrolledDropdown>
                                      <DropdownToggle
                                        className="btn btn-link text-muted py-1 font-size-16 shadow-none"
                                        tag="a"
                                      >
                                        <i className="bx bx-dots-horizontal-rounded"></i>
                                      </DropdownToggle>

                                      <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                          <DropdownItem to="#">
                                            Action
                                          </DropdownItem>
                                        </li>
                                        <li>
                                          <DropdownItem to="#">
                                            Another action
                                          </DropdownItem>
                                        </li>
                                        <li>
                                          <DropdownItem to="#">
                                            Something else here
                                          </DropdownItem>
                                        </li>
                                      </ul>
                                    </UncontrolledDropdown>
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
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                    selectRow={selectRow}
                                    defaultSorted={defaultSorted}
                                    classes={
                                      "table align-middle table-nowrap table-hover"
                                    }
                                    bordered={false}
                                    striped={false}
                                    responsive
                                  />

                                  <Modal isOpen={modal} toggle={toggle}>
                                    <ModalHeader toggle={toggle} tag="h4">
                                      {!!isEdit ? "Edit User" : "Add User"}
                                    </ModalHeader>
                                    <ModalBody>
                                      <AvForm
                                        onValidSubmit={handleValidUserSubmit}
                                      >
                                        <Row form>
                                          <Col xs={12}>
                                            <div className="mb-3">
                                              <AvField
                                                name="name"
                                                label="Name"
                                                type="text"
                                                errorMessage="Invalid name"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                value={userList.name || ""}
                                              />
                                            </div>
                                            <div className="mb-3">
                                              <AvField
                                                name="email"
                                                label="Email"
                                                type="email"
                                                errorMessage="Invalid Email"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                value={userList.email || ""}
                                              />
                                            </div>
                                            <div className="mb-3">
                                              <AvField
                                                type="select"
                                                name="designation"
                                                className="form-select"
                                                label="Designation"
                                                multiple={false}
                                                required
                                                value={
                                                  userList.designation || ""
                                                }
                                              >
                                                <option>SE</option>
                                                <option>SSE</option>
                                                <option>Developer</option>
                                                <option>Designer</option>
                                                <option>BA</option>
                                                <option>Tech Architect</option>
                                                <option>Tech Analyst</option>
                                                <option>Tech Lead</option>
                                                <option>Project Manager</option>
                                                <option>
                                                  Sr Project Manager
                                                </option>
                                                <option>Group Manager</option>
                                              </AvField>
                                            </div>
                                            <div className="mb-3">
                                              <AvField
                                                name="startdate"
                                                label="Start Date"
                                                type="date"
                                                // disabled={true}
                                                mask="99/99/9999"
                                                errorMessage="Invalid Date"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                value={userList.startdate || ""}
                                              />
                                            </div>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col>
                                            <div className="text-end">
                                              <button
                                                type="submit"
                                                className="btn btn-success save-user"
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

export default withRouter(Users);
