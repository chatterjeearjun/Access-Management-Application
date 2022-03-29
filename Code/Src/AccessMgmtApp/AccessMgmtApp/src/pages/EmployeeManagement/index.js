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
  Label,
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
import { empDuplicateCheck } from "../../helpers/fakebackend_helper";
import {
  getUsers as onGetUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
  getCompGroups as onGetGroups,
  getRoles as onGetRoles,
} from "../../store/actions";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";

// Form Mask
import InputMask from "react-input-mask";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const EmployeeManagement = (props) => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => ({
    users: state.contacts.users,
    result: state.contacts.result,
  }));
  const { groups } = useSelector((state) => ({
    groups: state.compGroups.groups,
  }));
  const { roles } = useSelector((state) => ({
    roles: state.contacts.roles,
  }));
  const { result } = useSelector((state) => ({
    result: state.contacts.result,
  }));

  const [userList, setUserList] = useState([]);
  const [groupList, setGroupsList] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [results, setResult] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isEmpDuplicate, setIsEmpDuplicate] = useState(false);

  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize: users.length, // replace later with size(users),
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

  const userListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      formatter: (cellContent, user) => <>{user.id}</>,
    },
    {
      text: "Name",
      dataField: "emp_first_name",
      sort: true,
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {user.emp_first_name} {user.emp_last_name}
            </Link>
          </h5>
          {/* <p className="text-muted mb-0">{user.designation}</p> */}
        </>
      ),
    },
    {
      dataField: "emp_role",
      text: "Role",
      sort: true,
    },
    {
      dataField: "emp_email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "emp_joining_date",
      text: "Start Date",
      sort: true,
      formatter: (cellContent, user) => (
        <>{user.emp_joining_date.split("T")[0]}</>
      ),
    },
    {
      dataField: "menu",
      isDummyField: false,
      editable: false,
      text: "Action",
      formatter: (cellContent, user) => (
        <div className="d-flex gap-3">
          <Link
            className="text-primary"
            to={`EmployeeProfile?${user.employee_identifier}`}
          >
            <i className="mdi mdi-eye font-size-18" id="viewemployee"></i>
          </Link>
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

  //Roles
  useEffect(() => {
    if (roles && !roles.length) {
      dispatch(onGetRoles());
    }
  }, [dispatch, roles]);

  useEffect(() => {
    setRolesList(roles);
  }, [roles]);

  //Groups
  useEffect(() => {
    if (groups && !groups.length) {
      dispatch(onGetGroups());
    }
  }, [dispatch, groups]);

  useEffect(() => {
    setGroupsList(groups);
  }, [groups]);

  const toggle = () => {
    setModal(!modal);
    if (!modal && !isEmpty(users) && !!isEdit) {
      setTimeout(() => {
        setUserList(users);
        setIsEdit(false);
        document.body.classList.add("no_padding");
      }, 500);
    }
  };

  const handleUserClick = (arg) => {
    const user = arg;
    setUserList({
      employeeid: user.employee_identifier,
      companyid: user.company_identifier,
      name: user.emp_first_name + " " + user.emp_last_name,
      fname: user.emp_first_name,
      lname: user.emp_last_name,
      phone: user.emp_office_phone,
      mobile: user.emp_mobile_number,
      designation: user.emp_designation,
      role: user.emp_role,
      email: user.emp_email,
      startdate: user.emp_joining_date.split("T")[0],
      createdby: user.created_by,
      createddate: user.created_date,
      modifiedby: user.modified_by,
      modifieddate: user.modified_date,
    });
    setIsEdit(true);
    toggle();
  };

  const handleDeleteUser = (user) => {
    confirmAlert({
      title: "Deleting Employee",
      message: "Are you sure you want to delete this Employee?",
      buttons: [
        {
          label: "Delete",
          onClick: () => {
            dispatch(onDeleteUser(user));
            setResult(result);
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
   * Handling submit user on user form
   */
  const handleValidUserSubmit = (e, values) => {
    debugger;
    // if (isEmpDuplicate) {
    if (isEdit) {
      const updateUser = {
        employee_identifier: userList.employeeid,
        company_identifier: userList.companyid,
        emp_designation: values["employeetype"],
        emp_role: values["role"],
        emp_first_name: values["fname"],
        emp_last_name: values["lname"],
        emp_email: values["email"],
        emp_office_phone: values["mobile"],
        emp_mobile_number: values["mobile"],
        emp_joining_date: new Date(
          values["startdate"].split("-")[0],
          values["startdate"].split("-")[1],
          values["startdate"].split("-")[2]
        )
          .toISOString()
          .slice(0, 19),
        modified_date: new Date().toISOString().slice(0, 19),
        modified_by: JSON.parse(localStorage.getItem("authUser")).username,
        created_date: userList.createddate,
        created_by: userList.createdby,
      };

      // update user
      dispatch(onUpdateUser(updateUser));
      setIsEdit(false);
      setResult(result);
      console.log(results, "jksdfgiuwenbkjwpowqpo");
    } else {
      // let photo = document.getElementById("image-file").files[0];
      // let formData = new FormData();
      // formData.append("photo", photo);
      // fetch("../../images", { method: "POST", body: formData });
      const newUser = {
        company_identifier: JSON.parse(localStorage.getItem("authUser"))
          .companyID,
        emp_designation: values["employeetype"],
        emp_role: values["role"],
        emp_first_name: values["fname"],
        emp_last_name: values["lname"],
        emp_email: values["email"],
        emp_office_phone: values["mobile"],
        emp_mobile_number: values["mobile"],
        emp_joining_date: new Date(
          values["startdate"].split("-")[0],
          values["startdate"].split("-")[1],
          values["startdate"].split("-")[2]
        )
          .toISOString()
          .slice(0, 19),
        created_date: new Date().toISOString().slice(0, 19),
        created_by: JSON.parse(localStorage.getItem("authUser")).username,
        modified_date: new Date().toISOString().slice(0, 19),
        modified_by: JSON.parse(localStorage.getItem("authUser")).username,
      };
      // save new user
      dispatch(onAddNewUser(newUser));
    }
    toggle();
    // }
  };

  const handleUserClicks = () => {
    setUserList("");
    setIsEdit(false);
    toggle();
  };
  // const Phone = (props) => (
  //   <InputMask
  //     mask="(999) 999-9999"
  //     value={props.value}
  //     className="form-control input-color"
  //     onChange={props.onChange}
  //   ></InputMask>
  // );
  const [selectedFiles, setselectedFiles] = useState([]);

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }
  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  // const [selectedFile, setSelectedFile] = useState();
  // const [isFilePicked, setIsFilePicked] = useState(false);
  // const changeHandler = (event) => {
  //   setSelectedFile(event.target.files[0]);
  //   setIsFilePicked(true);
  // };
  const empEmailChange = async (e) => {
    if (
      e.target.value != "" &&
      e.target.value != undefined &&
      e.target.value != null
    )
      setIsEmpDuplicate(await empDuplicateCheck(e.target.value));
  };
  console.log(isEmpDuplicate, "iwueyiuweyiuywiuye");
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Employee Management | Crossleaf - Access Management</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Employees" breadcrumbItem="Employee List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={userListColumns}
                    data={users}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={users}
                        columns={userListColumns}
                        search
                        //filter={filterFactory()}
                      >
                        {/* <Input
                          type="select"
                          id="vesselName"
                          onChange={(e) =>
                            this.handleSelectedSite(e.target.value)
                          }
                        >
                          <option>Select Role/Designation</option>
                          <option>SE</option>
                          <option>SSE</option>
                          <option>Developer</option>
                          <option>Designer</option>
                          <option>BA</option>
                          <option>Tech Architect</option>
                          <option>Tech Analyst</option>
                          <option>Tech Lead</option>
                          <option>Project Manager</option>
                          <option>Sr Project Manager</option>
                          <option>Group Manager</option>
                          <option>HR</option>
                        </Input> */}
                        {(toolkitProps) => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <div className="row align-ite  ms-center">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <h5 className="card-title">
                                      Current Employees{" "}
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
                                        Employee
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

                                  <Modal
                                    isOpen={modal}
                                    toggle={toggle}
                                    size="xl"
                                    scrollable={true}
                                  >
                                    <ModalHeader toggle={toggle} tag="h4">
                                      {!!isEdit
                                        ? "Edit Employee"
                                        : "Add Employee"}
                                    </ModalHeader>
                                    <ModalBody>
                                      <AvForm
                                        onValidSubmit={handleValidUserSubmit}
                                      >
                                        <Row form>
                                          <Col xs={12}>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="fname"
                                                    label="First Name"
                                                    type="text"
                                                    placeholder="employee first name"
                                                    errorMessage="please provide valid first name"
                                                    maxLength="15"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={userList.fname || ""}
                                                  />
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="lname"
                                                    label="Last Name"
                                                    type="text"
                                                    placeholder="employee last name"
                                                    errorMessage="please provide valid last name"
                                                    maxLength="15"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={userList.lname || ""}
                                                  />
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="email"
                                                    label="Email"
                                                    type="email"
                                                    placeholder="acs@crossleaf.ca"
                                                    errorMessage={
                                                      "please provide valid Email"
                                                    }
                                                    //   isEmpDuplicate !== "" &&
                                                    //   isEmpDuplicate === true
                                                    //     ? "User Already Exists"
                                                    //     : "please provide valid Email"
                                                    // }
                                                    maxLength="75"
                                                    validate={{
                                                      required: {
                                                        value: true,
                                                      },
                                                    }}
                                                    value={userList.email || ""}
                                                    // onChange={empEmailChange}
                                                  />
                                                  {isEmpDuplicate && (
                                                    <p className="error">
                                                      {"User Already Exists"}
                                                    </p>
                                                  )}
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  {/* <AvField
                                                    name="mobile"
                                                    label="Phone"
                                                    type="tel"
                                                    placeholder="(999)999-9999"
                                                    errorMessage="please provide valid Phone Number"
                                                    maxLength="10"
                                                    validate={{
                                                      required: {
                                                        value: true,
                                                        tel: true,
                                                      },
                                                    }}
                                                    value={
                                                      userList.mobile || ""
                                                    }
                                                  /> */}
                                                  <Label>Phone</Label>
                                                  <InputMask
                                                    mask="(999) 999-9999"
                                                    value={props.value}
                                                    className="form-control input-color"
                                                    onChange={props.onChange}
                                                    errorMessage="please provide valid Phone Number"
                                                    required
                                                  ></InputMask>
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    type="select"
                                                    name="employeetype"
                                                    className="form-select"
                                                    label="Employee Type"
                                                    multiple={false}
                                                    required
                                                    errorMessage="please select employee type"
                                                    value={
                                                      userList.designation || ""
                                                    }
                                                  >
                                                    <option>
                                                      Select Employee Type
                                                    </option>
                                                    <option>Contractor</option>
                                                    <option>Full Time</option>
                                                    <option>Part Time</option>
                                                    <option>Guest</option>
                                                    <option>External</option>
                                                  </AvField>
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    type="select"
                                                    name="employeegroup"
                                                    className="form-select"
                                                    label="Employee Group"
                                                    multiple={false}
                                                    required
                                                    errorMessage="please select employee group"
                                                    value={
                                                      groupList.group_name || ""
                                                    }
                                                  >
                                                    <option value="">
                                                      Select Employee Group
                                                    </option>
                                                    {groupList.map((group) => (
                                                      <option
                                                        key={group.id}
                                                        value={group.group_name}
                                                      >
                                                        {group.group_name}
                                                      </option>
                                                    ))}
                                                  </AvField>
                                                </div>
                                              </Col>
                                            </Row>
                                            {/* <div className="mb-3">
                                              <label>Phone</label>
                                              <Phone
                                                name="phone"
                                                value={phone}
                                                onChange={handleInput}
                                                validate={{
                                                  required: { value: true },
                                                }}
                                              />
                                            </div> */}
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    type="select"
                                                    name="role"
                                                    className="form-select"
                                                    label="Role"
                                                    errorMessage="please select employee role"
                                                    multiple={false}
                                                    required
                                                    value={userList.role || ""}
                                                  >
                                                    <option value="">
                                                      Select Employee Role
                                                    </option>
                                                    {rolesList.map((role) => (
                                                      <option
                                                        key={role.id}
                                                        value={role.identifier}
                                                      >
                                                        {role.role_name}
                                                      </option>
                                                    ))}
                                                  </AvField>
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="startdate"
                                                    label="Start Date"
                                                    type="date"
                                                    placeholder="99/99/9999"
                                                    // disabled={true}
                                                    //mask="99/99/9999"
                                                    errorMessage="please provide valid Date"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      userList.startdate || ""
                                                    }
                                                  />
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              {/* <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    type="select"
                                                    name="nda"
                                                    className="form-select"
                                                    label="Is NDA required"
                                                    errorMessage="please select nda required?"
                                                    multiple={false}
                                                    required
                                                    value={userList.nda || ""}
                                                  >
                                                    <option value="">
                                                      Select NDA Required
                                                    </option>
                                                    <option>Required</option>
                                                    <option>
                                                      Not Required
                                                    </option>
                                                  </AvField>
                                                </div>
                                              </Col> */}
                                              <Col xs={12}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="ndafile"
                                                    label="NDA Required Files"
                                                    inputClass="form-control"
                                                    type="file"
                                                    placeholder="choose NDA Required Files"
                                                    errorMessage="please provide valid file"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={""}
                                                  />
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              {/* <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    type="select"
                                                    name="bc"
                                                    className="form-select"
                                                    label="Is BC required"
                                                    errorMessage="please select bc required?"
                                                    multiple={false}
                                                    required
                                                    value={userList.bc || ""}
                                                  >
                                                    <option value="">
                                                      Select BC Required
                                                    </option>
                                                    <option>Required</option>
                                                    <option>
                                                      Not Required
                                                    </option>
                                                  </AvField>
                                                </div>
                                              </Col> */}
                                              <Col xs={12}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="bcfile"
                                                    label="BC Required Files"
                                                    inputClass="form-control"
                                                    type="file"
                                                    placeholder="choose BC Required Files"
                                                    errorMessage="please provide valid file"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={""}
                                                  />
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              {/* <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    type="select"
                                                    name="certificate"
                                                    className="form-select"
                                                    label="Is Certificates required?"
                                                    errorMessage="please select certificates required"
                                                    multiple={false}
                                                    required
                                                    value={
                                                      userList.certificates ||
                                                      ""
                                                    }
                                                  >
                                                    <option value="">
                                                      Select Certificates
                                                      Required
                                                    </option>
                                                    <option>Required</option>
                                                    <option>
                                                      Not Required
                                                    </option>
                                                  </AvField>
                                                </div>
                                              </Col> */}
                                              <Col xs={12}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="certificatefile"
                                                    label="Certificate Required Files"
                                                    inputClass="form-control"
                                                    type="file"
                                                    placeholder="choose Certificate Required Files"
                                                    errorMessage="please provide valid file"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={""}
                                                  />
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col xs={12}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="empphoto"
                                                    label="Employee Photo"
                                                    inputClass="form-control"
                                                    type="file"
                                                    placeholder="choose employee photo"
                                                    errorMessage="please provide valid file"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={""}
                                                  />
                                                </div>
                                              </Col>
                                            </Row>
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

export default withRouter(EmployeeManagement);
