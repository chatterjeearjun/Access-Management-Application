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
import Dropzone from "react-dropzone";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";

import { AvForm, AvField } from "availity-reactstrap-validation";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  getUsers as onGetUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
  getGroups as onGetGroups,
} from "../../store/actions";
import { isEmpty } from "lodash";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";

//redux
import { useSelector, useDispatch } from "react-redux";

import InputMask from "react-input-mask";

const EmployeeManagement = (props) => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => ({
    users: state.contacts.users,
  }));
  const { groups } = useSelector((state) => ({
    groups: state.contacts.groups,
  }));

  const [userList, setUserList] = useState([]);
  const [groupList, setGroupsList] = useState([]);
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
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ];

  const selectRow = {
    mode: "checkbox",
  };

  const selectOptions = {
    0: "SE",
    1: "SSE",
    2: "Developer",
    3: "Designer",
    4: "BA",
    5: "Tech Architect",
    6: "Tech Analyst",
    7: "Tech Lead",
    8: "Project Manager",
    9: "Sr Project Manager",
    10: "Group Manager",
    11: "HR",
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
      dataField: "emp_designation",
      text: "Designation",
      sort: true,
      //formatter: (cell) => selectOptions[cell],
      // filter: selectFilter({
      //   options: selectOptions,
      //   column: "Designation",
      // }),
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
      //dispatch(onGetGroups());
      setIsEdit(false);
    }
  }, [dispatch, users]);

  useEffect(() => {
    setUserList(users);
    setIsEdit(false);
  }, [users]);

  // useEffect(() => {
  //   if (groups && !groups.length) {
  //     dispatch(onGetGroups());
  //     setIsEdit(false);
  //   }
  // }, [dispatch, groups]);

  // useEffect(() => {
  //   setGroupsList(groups);
  //   setIsEdit(false);
  // }, [groups]);

  // console.log(groups, groupList, setGroupsList, "jfbjkhjhkshkjhk");

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
  // const [phone, setPhone] = React.useState("");
  // const handleInput = ({ target: { value } }) => setPhone(value);
  const handleUserClick = (arg) => {
    const user = arg;
    console.log(arg, "ksdgksgdkg");
    setUserList({
      id: user.id,
      guid: user.emp_guid,
      companyid: user.company_id,
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
    debugger;
    dispatch(onDeleteUser(user));
  };

  /**
   * Handling submit user on user form
   */
  const handleValidUserSubmit = (e, values) => {
    if (isEdit) {
      const updateUser = {
        id: userList.id,
        emp_guid: userList.guid,
        company_id: userList.companyid,
        emp_designation: values["designation"],
        emp_role: values["employeetype"],
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
    } else {
      // let photo = document.getElementById("image-file").files[0];
      // let formData = new FormData();
      // formData.append("photo", photo);
      // fetch("../../images", { method: "POST", body: formData });
      const newUser = {
        id: 0,
        company_id: 1,
        emp_designation: values["designation"],
        emp_role: values["employeetype"],
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

                                    {/* <UncontrolledDropdown>
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
                                    </UncontrolledDropdown> */}
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
                                            <div className="mb-3">
                                              <AvField
                                                name="email"
                                                label="Email"
                                                type="email"
                                                placeholder="acs@crossleaf.ca"
                                                errorMessage="please provide valid Email"
                                                maxLength="75"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                value={userList.email || ""}
                                              />
                                            </div>
                                            <div className="mb-3">
                                              <AvField
                                                name="mobile"
                                                label="Phone"
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
                                                value={userList.mobile || ""}
                                              />
                                            </div>
                                            <div className="mb-3">
                                              <AvField
                                                type="select"
                                                name="employeetype"
                                                className="form-select"
                                                label="Employee Type"
                                                multiple={false}
                                                required
                                                errorMessage="please select employee type"
                                                value={userList.role || ""}
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
                                            <div className="mb-3">
                                              <AvField
                                                type="select"
                                                name="employeegroup"
                                                className="form-select"
                                                label="Employee Group"
                                                multiple={false}
                                                required
                                                errorMessage="please select employee group"
                                                value={groupList || ""}
                                              >
                                                <option>
                                                  Select Employee Group
                                                </option>
                                                <option>Group1</option>
                                                <option>Group1</option>
                                                <option>Group1</option>
                                                <option>Group1</option>
                                                <option>Group1</option>
                                              </AvField>
                                            </div>
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
                                            <div className="mb-3">
                                              <AvField
                                                type="select"
                                                name="designation"
                                                className="form-select"
                                                label="Designation"
                                                errorMessage="please select role/designation"
                                                multiple={false}
                                                required
                                                value={
                                                  userList.designation || ""
                                                }
                                              >
                                                <option>
                                                  Select Role/Designation
                                                </option>
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
                                                <option>HR</option>
                                              </AvField>
                                            </div>
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
                                                value={userList.startdate || ""}
                                              />
                                            </div>

                                            <Row>
                                              <Col md={3}>
                                                <div className="mb-3">
                                                  <label>Employee Photo</label>
                                                  <Dropzone
                                                    onDrop={(acceptedFiles) => {
                                                      handleAcceptedFiles(
                                                        acceptedFiles
                                                      );
                                                    }}
                                                  >
                                                    {({
                                                      getRootProps,
                                                      getInputProps,
                                                    }) => (
                                                      <div className="dropzone">
                                                        <div
                                                          className="dz-message needsclick mt-2"
                                                          {...getRootProps()}
                                                        >
                                                          <input
                                                            {...getInputProps()}
                                                            id="image-file"
                                                          />
                                                          <div className="mb-3">
                                                            <i className="display-4 text-muted bx bxs-cloud-upload" />
                                                          </div>
                                                          <h4>
                                                            click to upload.
                                                          </h4>
                                                        </div>
                                                      </div>
                                                    )}
                                                  </Dropzone>
                                                </div>
                                              </Col>
                                              <Col md={3}>
                                                <div
                                                  className="dropzone-previews mt-3"
                                                  id="file-previews"
                                                >
                                                  {selectedFiles.map((f, i) => {
                                                    return (
                                                      <Card
                                                        className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                        key={i + "-file"}
                                                      >
                                                        <div className="p-2">
                                                          <Row className="align-items-center">
                                                            <Col className="col-auto">
                                                              <img
                                                                data-dz-thumbnail=""
                                                                height="80"
                                                                className="avatar-sm rounded bg-light"
                                                                alt={f.name}
                                                                src={f.preview}
                                                              />
                                                            </Col>
                                                            <Col>
                                                              <Link
                                                                to="#"
                                                                className="text-muted font-weight-bold"
                                                              >
                                                                {f.name}
                                                              </Link>
                                                              <p className="mb-0">
                                                                <strong>
                                                                  {
                                                                    f.formattedSize
                                                                  }
                                                                </strong>
                                                              </p>
                                                            </Col>
                                                          </Row>
                                                        </div>
                                                      </Card>
                                                    );
                                                  })}
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
