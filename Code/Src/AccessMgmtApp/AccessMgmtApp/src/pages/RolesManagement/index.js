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

import Select from "react-select";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";

import { AvForm, AvField } from "availity-reactstrap-validation";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

import makeAnimated from "react-select/animated";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import {
  getRoles as onGetRoles,
  addNewRole as onAddNewRole,
  updateRole as onUpdateRole,
  deleteRole as onDeleteRole,
  getAssets as onGetAssets,
  getCompGroups as onGetCompGroups,
} from "../../store/actions";
import { isEmpty } from "lodash";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
//redux
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
const RolesManagement = (props) => {
  const dispatch = useDispatch();

  const { roles } = useSelector((state) => ({
    roles: state.contacts.roles,
  }));
  const { assets } = useSelector((state) => ({
    assets: state.assetsManagement.assets,
  }));
  const { groups } = useSelector((state) => ({
    groups: state.compGroups.groups,
  }));

  const [roleList, setRoleList] = useState([]);
  const [assetList, setAssetList] = useState([]);
  const [assetSelected, setAssetSelected] = useState([]);
  const [groupSelected, setGroupsSelected] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { SearchBar } = Search;

  // const animatedComponents = makeAnimated();
  const pageOptions = {
    sizePerPage: 10,
    totalSize: roles?.length, // replace later with size(roles),
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

  const roleListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      formatter: (cellContent, role) => <>{role.id}</>,
    },
    {
      text: "Role Name",
      dataField: "role_name",
      sort: true,
      formatter: (cellContent, role) => (
        <>
          <h5 className="font-size-14 mb-1 text-dark">{role.role_name}</h5>
          {/* <p className="text-muted mb-0">{role.designation}</p> */}
        </>
      ),
    },
    {
      dataField: "role_description",
      text: "Role Description",
      sort: true,
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (cellContent, role) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleRoleClick(role)}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => handleDeleteRole(role)}
            ></i>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (roles && !roles.length) {
      dispatch(onGetRoles());
      setIsEdit(false);
    }
  }, [dispatch, roles]);

  useEffect(() => {
    setRoleList(roles);
    setIsEdit(false);
  }, [roles]);

  //Assets
  useEffect(() => {
    if (assets && !assets.length) {
      dispatch(onGetAssets());
    }
  }, [dispatch, assets]);

  useEffect(() => {
    setAssetList(assets);
  }, [assets]);

  //Groups
  useEffect(() => {
    if (groups && !groups.length) {
      dispatch(onGetCompGroups());
    }
  }, [dispatch, groups]);

  useEffect(() => {
    setGroupList(groups);
  }, [groups]);

  const toggle = () => {
    setModal(!modal);
    if (!modal && !isEmpty(roles) && !!isEdit) {
      setTimeout(() => {
        setRoleList(roles);
        setIsEdit(false);
      }, 500);
    }
  };

  const handleRoleClick = (arg) => {
    const role = arg;
    setRoleList({
      roleid: role.role_identifier,
      rolename: role.role_name,
      companyid: role.company_identifier,
      roledesc: role.role_description,
      roledescattachment: role.role_description_attachment,
      isactive: role.is_active,
      nda: role.is_mda_required === true ? "Required" : "Not Required",
      bc: role.is_bc_required === true ? "Required" : "Not Required",
      certificates:
        role.is_certification_required === true ? "Required" : "Not Required",
    });
    setIsEdit(true);
    toggle();
  };

  const handleDeleteRole = (role) => {
    confirmAlert({
      title: "Deleting Role",
      message: "Are you sure you want to delete this Role?",
      buttons: [
        {
          label: "Delete",
          onClick: () => {
            dispatch(onDeleteRole(role));
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
   * Handling submit role on role form
   */
  const handleValidRoleSubmit = (e, values) => {
    if (isEdit) {
      const updateRole = {
        role_identifier: roleList.roleid,
        company_identifier: roleList.companyid,
        role_name: values["name"],
        role_description: values["description"],
        role_description_attachment: "",
        is_active: roleList.isactive,
        is_mda_required: values["nda"] === "Required" ? true : false,
        is_bc_required: values["bc"] === "Required" ? true : false,
        is_certification_required:
          values["certificates"] === "Required" ? true : false,
      };
      // update role
      dispatch(onUpdateRole(updateRole));
      setIsEdit(false);
    } else {
      const newRole = {
        company_identifier: JSON.parse(localStorage.getItem("authUser"))
          .companyID,
        role_name: values["name"],
        role_description: values["description"],
        role_description_attachment: "",
        is_active: true,
        is_mda_required: values["nda"] === "Required" ? true : false,
        is_bc_required: values["bc"] === "Required" ? true : false,
        is_certification_required:
          values["certificates"] === "Required" ? true : false,
      };
      // save new role
      dispatch(onAddNewRole(newRole));
    }
    toggle();
  };
  const handleRoleClicks = () => {
    setRoleList("");
    setIsEdit(false);
    toggle();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Roles | Crossleaf - Access Management</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Roles" breadcrumbItem="Role List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={roleListColumns}
                    data={roles}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={roles}
                        columns={roleListColumns}
                        search
                      >
                        {(toolkitProps) => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <div className="row align-ite  ms-center">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <h5 className="card-title">
                                      Current Roles{" "}
                                      <span className="text-muted fw-normal ms-2">
                                        ({roles.length})
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
                                        onClick={handleRoleClicks}
                                      >
                                        <i className="bx bx-plus me-1"></i> Add
                                        Role
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
                                      {!!isEdit ? "Edit Role" : "Add Role"}
                                    </ModalHeader>
                                    <ModalBody>
                                      <AvForm
                                        onValidSubmit={handleValidRoleSubmit}
                                      >
                                        <Row form>
                                          <Col xs={12}>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="name"
                                                    label="Role Name"
                                                    placeholder="role name"
                                                    type="text"
                                                    errorMessage="please provide valid name"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      roleList.rolename || ""
                                                    }
                                                  />
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="description"
                                                    label="Role Description"
                                                    placeholder="role description..."
                                                    type="textarea"
                                                    errorMessage="please provide valid Description"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      roleList.roledesc || ""
                                                    }
                                                  />
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="roledescattchment"
                                                    label="Job Description Attachment"
                                                    inputClass="form-control"
                                                    type="file"
                                                    //placeholder="choose employee photo"
                                                    errorMessage="please provide valid file"
                                                    // validate={{
                                                    //   required: { value: true },
                                                    // }}
                                                    value={""}
                                                  />
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    type="select"
                                                    name="nda"
                                                    className="form-select"
                                                    label="Is NDA Required?"
                                                    errorMessage="please select NDA required or not"
                                                    multiple={false}
                                                    required
                                                    value={roleList.nda || ""}
                                                  >
                                                    <option>
                                                      select Is NDA Required?
                                                    </option>
                                                    <option>Required</option>
                                                    <option>
                                                      Not Required
                                                    </option>
                                                  </AvField>
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    type="select"
                                                    name="bc"
                                                    className="form-select"
                                                    label="Is Background Check Required?"
                                                    errorMessage="please select Background Check required or not"
                                                    multiple={false}
                                                    required
                                                    value={roleList.bc || ""}
                                                  >
                                                    <option>
                                                      select Is Background Check
                                                      Required?
                                                    </option>
                                                    <option>Required</option>
                                                    <option>
                                                      Not Required
                                                    </option>
                                                  </AvField>
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    type="select"
                                                    name="certificates"
                                                    className="form-select"
                                                    label="Is Certificates Required?"
                                                    errorMessage="please select Certificates required or not"
                                                    multiple={false}
                                                    required
                                                    value={
                                                      roleList.certificates ||
                                                      ""
                                                    }
                                                  >
                                                    <option>
                                                      select Is Certificates
                                                      Required?
                                                    </option>
                                                    <option>Required</option>
                                                    <option>
                                                      Not Required
                                                    </option>
                                                  </AvField>
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <label>Link Assets</label>
                                                  <DropdownMultiselect
                                                    placeholder="select asset/assets"
                                                    buttonClass="btn-light"
                                                    selectDeselectLabel=""
                                                    required
                                                    value={
                                                      roleList.certificates
                                                    }
                                                    options={assetList.map(
                                                      (asset) =>
                                                        asset.asset_name
                                                    )}
                                                    name="assets"
                                                    handleOnChange={(
                                                      selected
                                                    ) => {
                                                      setAssetSelected(
                                                        selected
                                                      );
                                                    }}
                                                  />
                                                </div>
                                                {/* <div className="mb-3">
                                                  <label className="control-label">
                                                    Link Assets
                                                  </label>
                                                  <Select
                                                    isMulti={true}
                                                    options={assetList.map(
                                                      (asset) => {
                                                        {
                                                          label:
                                                            asset.asset_name,
                                                          value:
                                                            asset.asset_name,
                                                        },
                                                    }
                                                    )}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select2-selection"
                                                    closeMenuOnSelect={false}
                                                    components={
                                                      animatedComponents
                                                    }
                                                  />
                                                </div> */}
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <label>Link Groups</label>
                                                  <DropdownMultiselect
                                                    placeholder="select Group/Groups"
                                                    buttonClass="btn-light"
                                                    selectDeselectLabel=""
                                                    required
                                                    value={groupList.group_name}
                                                    options={groupList.map(
                                                      (group) =>
                                                        group.group_name
                                                    )}
                                                    name="groups"
                                                    handleOnChange={(
                                                      selected
                                                    ) => {
                                                      setGroupsSelected(
                                                        selected
                                                      );
                                                    }}
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
                                                className="btn btn-success save-role"
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

export default withRouter(RolesManagement);
