import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { withRouter, Link, useLocation } from "react-router-dom";
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
//import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { MultiSelect } from "react-multi-select-component";
import { FaUserEdit } from "react-icons/fa";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import InputMask from "react-input-mask";
import Loading from "react-fullscreen-loading";
import SweetAlert from "react-bootstrap-sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { empDuplicateCheck } from "../../helpers/fakebackend_helper";
import {
  getUsers as onGetUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
  getCompGroups as onGetGroups,
  getRoles as onGetRoles,
  getAssets as onGetAssets,
} from "../../store/actions";
import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { FcUpload, FcDownload } from "react-icons/fc";

const EmployeeManagement = () => {
  const dispatch = useDispatch();

  const { users, result } = useSelector((state) => ({
    users: state.employeesManagement.users,
    result: state.employeesManagement.result,
  }));
  const { groups } = useSelector((state) => ({
    groups: state.compGroups.groups,
  }));
  const { roles } = useSelector((state) => ({
    roles: state.rolesManagement.roles,
  }));
  const { assets } = useSelector((state) => ({
    assets: state.assetsManagement.assets,
  }));

  const [userList, setUserList] = useState([]),
    [groupList, setGroupsList] = useState([]),
    [rolesList, setRolesList] = useState([]),
    [modal, setModal] = useState(false),
    [isEdit, setIsEdit] = useState(false),
    [isEmpDuplicate, setIsEmpDuplicate] = useState(false),
    [selectedProfileFile, setSelectedProfileFile] = useState(),
    [selectedFiles, setSelectedFiles] = useState({ docsSelected: [] }),
    [assetList, setAssetList] = useState([]),
    [assetsSelected, setAssetsSelected] = useState([]),
    [docsRequired, setDocsRequired] = useState(),
    [isLoading, setIsLoading] = useState(false),
    [phone, setPhone] = useState(""),
    [deleteAlert, setDeleteAlert] = useState(false),
    [deleteRow, setDeleteRow] = useState(false),
    [selectedFileError, setSelectedFileError] = useState(false),
    [uploadType, setUploadType] = useState("");
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
        </>
      ),
    },
    {
      dataField: "emp_role",
      text: "Role",
      sort: true,
      formatter: (cellContent, user) => (
        <>{JSON.parse(user?.emp_role)[0]?.Key}</>
      ),
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
            <FaUserEdit
              className="font-size-18"
              id="edittooltip"
              onClick={() => handleUserClick(user)}
            ></FaUserEdit>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => {
                setDeleteAlert(true);
                setDeleteRow(user);
              }}
            ></i>
          </Link>
        </div>
      ),
    },
  ];

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const params = [useQuery().get("date"), useQuery().get("type")];

  useEffect(() => {
    setIsLoading(true);
    if (users && !users.length) {
      dispatch(onGetUsers());
      setIsEdit(false);
    }
  }, []);

  useEffect(() => {
    setIsEdit(false);
    debugger;
    if (
      users.length > 0 &&
      params[0] &&
      (params[1] === "uAdded" ||
        params[1] === "uApproved" ||
        params[1] === "uRejected" ||
        params[1] === "uPending" ||
        params[1] === "uOverdue")
    ) {
      if (params[1] === "uAdded") {
        const filteredUsers = users?.filter(
          (user) =>
            moment(user.created_date).format("YYYY-MM-DD") >=
              params[0]?.split(",")[0] &&
            moment(user.created_date).format("YYYY-MM-DD") <=
              params[0]?.split(",")[1]
        );
        setUserList(filteredUsers);
      } else if (params[1] === "uApproved") {
        const filteredUsers = users?.filter(
          (user) =>
            moment(user.created_date).format("YYYY-MM-DD") >=
              params[0]?.split(",")[0] &&
            moment(user.created_date).format("YYYY-MM-DD") <=
              params[0]?.split(",")[1] &&
            user.is_approved === true
        );

        setUserList(filteredUsers);
      } else if (params[1] === "uRejected") {
        const filteredUsers = users?.filter(
          (user) =>
            moment(user.created_date).format("YYYY-MM-DD") >=
              params[0]?.split(",")[0] &&
            moment(user.created_date).format("YYYY-MM-DD") <=
              params[0]?.split(",")[1] &&
            user.is_approved === false
        );
        setUserList(filteredUsers);
      } else if (params[1] === "uPending") {
        const filteredUsers = users?.filter(
          (user) =>
            moment(user.created_date).format("YYYY-MM-DD") >=
              params[0]?.split(",")[0] &&
            moment(user.created_date).format("YYYY-MM-DD") <=
              params[0]?.split(",")[1] &&
            user.is_approved === null
        );
        setUserList(filteredUsers);
      } else if (params[1] === "uOverdue") {
        const filteredUsers = users?.filter(
          (user) =>
            moment(user.created_date).format("YYYY-MM-DD") >=
              params[0]?.split(",")[0] &&
            moment(user.created_date).format("YYYY-MM-DD") <=
              params[0]?.split(",")[1] &&
            moment(user.emp_approval_overdue).format("YYYY-MM-DD") >
              params[0]?.split(",")[1]
        );
        setUserList(filteredUsers);
      }
    } else setUserList(users);
  }, [users]);

  //Roles
  useEffect(() => {
    if (roles && !roles.length) {
      dispatch(onGetRoles());
    }
  }, []);

  useEffect(() => {
    setRolesList(roles);
  }, [roles]);

  //Groups
  useEffect(() => {
    if (groups && !groups.length) {
      dispatch(onGetGroups());
    }
  }, []);

  useEffect(() => {
    setGroupsList(groups);
  }, [groups]);

  //Assets
  useEffect(() => {
    if (assets && !assets.length) {
      dispatch(onGetAssets());
    }
  }, []);

  useEffect(() => {
    setAssetList(assets);
  }, [assets]);

  const toggle = () => {
    setModal(!modal);
    if (!modal && !isEmpty(users) && !!isEdit) {
      setTimeout(() => {
        setUserList(users);
        setIsEdit(false);
        setDocsRequired(null);
        setPhone("");
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
      role: JSON.parse(user.emp_role)[0].Value,
      group: user.emp_group,
      email: user.emp_email,
      startdate: user.emp_joining_date.split("T")[0],
      createdby: user.created_by,
      createddate: user.created_date,
      modifiedby: user.modified_by,
      modifieddate: user.modified_date,
      ndadoc: user.emp_nda_document1,
      bcdoc: user.emp_bc_document1,
      certdoc: user.emp_cert_document1,
    });
    setIsEdit(true);
    setPhone(user.emp_mobile_number);
    toggle();
  };

  const handleDeleteUser = () => {
    dispatch(onDeleteUser(deleteRow));
  };

  /**
   * Handling submit user on user form
   */
  const handleValidUserSubmit = (e, values) => {
    if (isEdit) {
      const updateUser = {
        employee_identifier: userList.employeeid,
        company_identifier: userList.companyid,
        emp_designation: values["employeetype"],
        emp_role: userList.role,
        emp_group: values["employeegroup"],
        emp_first_name: values["fname"],
        emp_last_name: values["lname"],
        emp_email: values["email"],
        emp_office_phone: phone,
        emp_mobile_number: phone,
        emp_joining_date: new Date(
          values["startdate"].split("-")[0],
          values["startdate"].split("-")[1],
          values["startdate"].split("-")[2]
        )
          .toISOString()
          .slice(0, 19),
        emp_documents: userList.emp_documents,
        associated_assets: JSON.stringify(assetsSelected),
      };

      // update user
      dispatch(onUpdateUser(updateUser));
      setIsEdit(false);
    } else {
      setIsLoading(true);
      const newUser = {
        company_identifier: "6c0276ec-fea1-4fa8-bb1f-5d428a850222", //JSON.parse(localStorage.getItem("authUser")).companyID,
        emp_designation: values["employeetype"],
        emp_role: values["role"],
        emp_group: values["employeegroup"],
        emp_first_name: values["fname"],
        emp_last_name: values["lname"],
        emp_email: values["email"],
        emp_office_phone: phone,
        emp_mobile_number: phone,
        emp_joining_date: new Date(
          values["startdate"].split("-")[0],
          values["startdate"].split("-")[1],
          values["startdate"].split("-")[2]
        )
          .toISOString()
          .slice(0, 19),
        emp_documents: selectedFiles.docsSelected
          ? selectedFiles.docsSelected
          : "",
        emp_profile_picture: selectedProfileFile,
        is_active: true,
        associated_assets: JSON.stringify(assetsSelected),
      };
      // save new user
      dispatch(onAddNewUser(newUser));
    }
    toggle();
  };
  useEffect(() => {
    if ((result != null && result === "add user success") || users != null) {
      setIsLoading(false);
    }
  }, [result, isLoading, users]);

  const handleUserClicks = () => {
    //setUserList([]);
    setIsEdit(false);
    setDocsRequired(null);
    toggle();
  };
  //const [selectedFiles, setselectedFiles] = useState([]);

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    //setselectedFiles(files);
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

  const empEmailChange = async (e) => {
    if (
      e.target.value !== "" &&
      e.target.value !== undefined &&
      e.target.value !== null
    ) {
      const isexists = await empDuplicateCheck(e.target.value);
      setIsEmpDuplicate(isexists);
    }
  };

  let assetlist = [];
  for (var i = 0; i < assetList.length; i++) {
    assetlist[i] = {
      label: assetList[i].asset_name,
      value: assetList[i].asset_identifier,
    };
  }

  const handleRoleChange = (e) => {
    if (e.target.value !== "") {
      const final = rolesList?.filter(
        (role) => role?.role_identifier === e.target.value
      );
      console.log(JSON.parse(final[0]?.associated_documents), "sdkfhkdjh");
      setDocsRequired(JSON.parse(final[0]?.associated_documents));
    } else {
      setDocsRequired([]);
      setUploadType("");
    }
  };

  useEffect(() => {}, [docsRequired]);
  const handleInput = (e) => {
    // console.log(e.target.value, "phone");
    setPhone(e.target.value);
  };

  //Toasts
  if (result === "Employee Deleted") {
    toast("Employee Deleted Successfully !", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      toastId: "009",
    });
  }
  const requiredFilesChange = (e) => {
    debugger;
    const { files, id, name } = e.target;
    const { docsSelected: docs } = selectedFiles;
    setSelectedFiles({
      docsSelected: [
        ...docs,
        { documentId: id, documentName: name, documentDetail: files[0] },
      ],
    });
  };

  return (
    <React.Fragment>
      <SweetAlert
        title="Are you sure want to Delete"
        custom
        showConfirm
        showCancel
        confirmBtnBsStyle="danger"
        confirmBtnText="Delete"
        cancelBtnText="Cancel"
        cancelBtnBsStyle="light"
        customIcon={""}
        onConfirm={() => {
          setDeleteAlert(false);
          handleDeleteUser(deleteRow);
        }}
        onCancel={() => {
          setDeleteAlert(false);
        }}
        show={deleteAlert}
      />
      <SweetAlert
        title="Select only .XLS or .XLSX files"
        custom
        showConfirm
        confirmBtnBsStyle="primary"
        confirmBtnText="Ok"
        customIcon={""}
        onConfirm={() => {
          setSelectedFileError(false);
        }}
        show={selectedFileError}
      />
      <Loading
        loading={isLoading}
        background="#ffffffcc"
        loaderColor="#5156be"
      />
      <div className="page-content">
        <MetaTags>
          <title>Employee Management | Crossleaf - Access Management</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Employees" breadcrumbItem="Employee List" />
          <ToastContainer />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={userListColumns}
                    data={userList}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={userList}
                        columns={userListColumns}
                        search
                        //filter={filterFactory()}
                      >
                        {(toolkitProps) => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <div className="row align-ite  ms-center">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <h5 className="card-title">
                                      {params[1] != null
                                        ? params[1].slice(1)
                                        : "Current"}{" "}
                                      Employees{" "}
                                      <span className="text-muted fw-normal ms-2">
                                        ({userList.length})
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
                                    <div>
                                      <Link
                                        to="/EmployeeBulkUpload"
                                        className="btn btn-light"
                                      >
                                        <FcUpload className="me-1" />
                                        Bulk Employee Upload
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
                                    noDataIndication="No Users Found"
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
                                                    errormessage="please provide valid first name"
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
                                                    errormessage="please provide valid last name"
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
                                                    errormessage={
                                                      "please provide valid Email"
                                                    }
                                                    maxLength="75"
                                                    validate={{
                                                      match: {
                                                        value: isEmpDuplicate,
                                                        errorMessage:
                                                          "Email already exists!",
                                                      },
                                                      required: {
                                                        value: true,
                                                      },
                                                    }}
                                                    value={userList.email || ""}
                                                    onChange={empEmailChange}
                                                  />
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <Label>Phone</Label>
                                                  <InputMask
                                                    value={phone || ""}
                                                    onChange={handleInput}
                                                    mask="(999) 999-9999"
                                                    alwaysShowMask={true}
                                                    className="form-control
                                                    input-color"
                                                    errormessage="please provide
                                                    valid Phone Number"
                                                    required={true}
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
                                                    errormessage="please select employee type"
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
                                                    errormessage="please select employee group"
                                                    value={userList.group || ""}
                                                  >
                                                    <option value="">
                                                      Select Employee Group
                                                    </option>
                                                    {groupList.map((group) => (
                                                      <option
                                                        key={group.id}
                                                        value={
                                                          group.group_identifier
                                                        }
                                                      >
                                                        {group.group_name}
                                                      </option>
                                                    ))}
                                                  </AvField>
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <label>Link Assets</label>
                                                  <MultiSelect
                                                    required={true}
                                                    value={assetsSelected}
                                                    options={assetlist}
                                                    labelledBy="select asset/assets"
                                                    placeholder="select asset/assets"
                                                    name="assets"
                                                    onChange={setAssetsSelected}
                                                  />
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="startdate"
                                                    label="Start Date"
                                                    type="date"
                                                    placeholder="99/99/9999"
                                                    errormessage="please provide valid Date"
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
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    type="select"
                                                    name="role"
                                                    className="form-select"
                                                    label="Role"
                                                    errormessage="please select employee role"
                                                    multiple={false}
                                                    disabled={
                                                      isEdit ? true : false
                                                    }
                                                    required
                                                    value={userList.role || ""}
                                                    onChange={handleRoleChange}
                                                  >
                                                    <option value="">
                                                      Select Employee Role
                                                    </option>
                                                    {rolesList.map((role) => (
                                                      <option
                                                        key={role.id}
                                                        value={
                                                          role.role_identifier
                                                        }
                                                      >
                                                        {role.role_name}
                                                      </option>
                                                    ))}
                                                  </AvField>
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                {!isEdit &&
                                                  docsRequired?.length > 0 && (
                                                    <div>
                                                      <h5 className="font-size-14 mb-3 mt-3">
                                                        Choose how to provide
                                                        documents?
                                                      </h5>

                                                      <div className="form-check form-check-inline">
                                                        <input
                                                          className="form-check-input"
                                                          type="radio"
                                                          name="uploadtype"
                                                          id="uploadfile"
                                                          value="uploadfile"
                                                          required
                                                          onChange={(e) =>
                                                            setUploadType(
                                                              e.target.value
                                                            )
                                                          }
                                                        />
                                                        <label
                                                          className="form-check-label"
                                                          htmlFor="uploadfile"
                                                        >
                                                          Upload File
                                                        </label>
                                                      </div>
                                                      <div className="form-check form-check-inline">
                                                        <input
                                                          className="form-check-input"
                                                          type="radio"
                                                          name="uploadtype"
                                                          id="urlinput"
                                                          value="urlinput"
                                                          required
                                                          onChange={(e) =>
                                                            setUploadType(
                                                              e.target.value
                                                            )
                                                          }
                                                        />
                                                        <label
                                                          className="form-check-label"
                                                          htmlFor="urlinput"
                                                        >
                                                          Url of you file
                                                        </label>
                                                      </div>
                                                      <div className="form-check form-check-inline">
                                                        <input
                                                          className="form-check-input"
                                                          type="radio"
                                                          name="uploadtype"
                                                          id="alreadyuploaded"
                                                          value="alreadyuploaded"
                                                          required
                                                          onChange={(e) =>
                                                            setUploadType(
                                                              e.target.value
                                                            )
                                                          }
                                                        />
                                                        <label
                                                          className="form-check-label"
                                                          htmlFor="alreadyuploaded"
                                                        >
                                                          Already with Company
                                                        </label>
                                                      </div>
                                                    </div>
                                                  )}{" "}
                                              </Col>
                                            </Row>

                                            <Row>
                                              {!isEdit &&
                                              uploadType === "uploadfile" &&
                                              docsRequired?.length > 0
                                                ? docsRequired?.map(
                                                    (document) => (
                                                      <Col xs={6}>
                                                        <div className="mb-3">
                                                          <AvField
                                                            name={
                                                              document?.Key?.split(
                                                                " "
                                                              )[0]
                                                            }
                                                            label={
                                                              document?.Key +
                                                              " Required Files"
                                                            }
                                                            inputClass="form-control"
                                                            type="file"
                                                            placeholder={
                                                              "choose " +
                                                              document?.Key +
                                                              " Required Files"
                                                            }
                                                            errormessage={
                                                              "please provide valid " +
                                                              document?.Key +
                                                              " file"
                                                            }
                                                            validate={{
                                                              required: {
                                                                value: true,
                                                              },
                                                            }}
                                                            id={document?.Value}
                                                            onChange={
                                                              requiredFilesChange
                                                            }
                                                            value={""}
                                                          />
                                                        </div>
                                                      </Col>
                                                    )
                                                  )
                                                : ""}
                                            </Row>
                                            <Row>
                                              {!isEdit &&
                                              uploadType === "urlinput" &&
                                              docsRequired?.length > 0
                                                ? docsRequired?.map(
                                                    (document) => (
                                                      <Col xs={6}>
                                                        <div className="mb-3">
                                                          <AvField
                                                            name={
                                                              document?.Key?.split(
                                                                " "
                                                              )[0]
                                                            }
                                                            label={
                                                              document?.Key +
                                                              " Required Files URL"
                                                            }
                                                            inputClass="form-control"
                                                            type="url"
                                                            placeholder={
                                                              "provide " +
                                                              document?.Key +
                                                              " Required Files URL"
                                                            }
                                                            errormessage={
                                                              "please provide valid " +
                                                              document?.Key +
                                                              " url"
                                                            }
                                                            validate={{
                                                              required: {
                                                                value: true,
                                                              },
                                                            }}
                                                            onChange={(e) => {
                                                              setSelectedFiles(
                                                                e.target
                                                                  .files[0]
                                                              );
                                                            }}
                                                            value={""}
                                                          />
                                                        </div>
                                                      </Col>
                                                    )
                                                  )
                                                : ""}
                                            </Row>
                                            {!isEdit ? (
                                              <Row>
                                                <Col xs={12}>
                                                  <div className="mb-3">
                                                    <AvField
                                                      name="empphoto"
                                                      label="Employee Photo"
                                                      inputClass="form-control"
                                                      type="file"
                                                      placeholder="choose employee photo"
                                                      errormessage="please provide valid file"
                                                      validate={{
                                                        required: {
                                                          value: true,
                                                        },
                                                      }}
                                                      onChange={(e) =>
                                                        setSelectedProfileFile(
                                                          e.target.files[0]
                                                        )
                                                      }
                                                      value={""}
                                                    />
                                                  </div>
                                                </Col>
                                              </Row>
                                            ) : (
                                              ""
                                            )}
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
