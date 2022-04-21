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
  getDocs as onGetDocs,
} from "../../store/actions";
import { isEmpty } from "lodash";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
//redux
import { useSelector, useDispatch } from "react-redux";

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
  const { docs } = useSelector((state) => ({
    docs: state.docsManagement.docs,
  }));

  const [roleList, setRoleList] = useState([]);
  const [assetList, setAssetList] = useState([]);
  const [assetsSelected, setAssetSelected] = useState([]);
  const [groupSelected, setGroupsSelected] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [docsList, setDocsList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState(),
    [selectedDocsReq, setSelectedDocsReq] = useState({
      docsSelected: [],
    });
  const { SearchBar } = Search;

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
  }, []);

  useEffect(() => {
    setRoleList(roles);
    setIsEdit(false);
  }, [roles]);

  //Assets
  useEffect(() => {
    if (assets && !assets.length) {
      dispatch(onGetAssets());
    }
  }, []);

  useEffect(() => {
    setAssetList(assets);
  }, [assets]);

  //Groups
  useEffect(() => {
    if (groups && !groups.length) {
      dispatch(onGetCompGroups());
    }
  }, []);

  useEffect(() => {
    setGroupList(groups);
  }, [groups]);

  //Docs
  useEffect(() => {
    if (docs && !docs.length) {
      dispatch(onGetDocs());
    }
  }, []);

  useEffect(() => {
    setDocsList(docs);
  }, [docs]);

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
    debugger;
    setRoleList({
      roleid: role.role_identifier,
      rolename: role.role_name,
      companyid: role.company_identifier,
      roledesc: role.role_description,
      roledescattachment: role.role_description_attachment,
      isactive: role.is_active,
      documentsSelected: JSON.parse(role.associated_documents),
      associatedassets: role.associated_assets?.split(","),
    });
    setIsEdit(true);
    toggle();
  };
  console.log(roleList, "roleList");
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
        role_description_attachment: roleList.roledescattachment,
        is_active: roleList.isactive,
        RoleDocumentMapping: selectedDocsReq.docsSelected.toString(),
        associated_assets: assetsSelected.toString(),
      };
      // update role
      dispatch(onUpdateRole(updateRole));
      setIsEdit(false);
    } else {
      const newRole = {
        company_identifier: "6c0276ec-fea1-4fa8-bb1f-5d428a850222",
        role_name: values["name"],
        role_description: values["description"],
        role_description_attachment: file,
        is_active: true,
        RoleDocumentMapping: selectedDocsReq.docsSelected,
        associated_assets: assetsSelected.toString(),
      };
      console.log(newRole, "newrole");
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

  let assetlist = [];
  for (var i = 0; i < assetList.length; i++) {
    assetlist[i] = {
      label: assetList[i].asset_name,
      key: assetList[i].asset_identifier,
    };
  }

  const handleDocReqChange = (e) => {
    debugger;
    const { value, selectedIndex } = e.target;
    const { docsSelected: docs } = selectedDocsReq;
    if (selectedIndex === 1) {
      setSelectedDocsReq({
        docsSelected: [...docs, value],
      });
    } else {
      setSelectedDocsReq({
        docsSelected: docs.filter((doc) => doc !== value.split("Not*")[1]),
      });
    }
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
                                                {isEdit ? (
                                                  <div className="mb-3">
                                                    <AvField
                                                      name="roleattach"
                                                      label="Job Description Attachment"
                                                      type="text"
                                                      disabled={true}
                                                      errorMessage="please provide valid file"
                                                      // validate={{
                                                      //   required: {
                                                      //     value: true,
                                                      //   },
                                                      // }}
                                                      value={
                                                        roleList.roledescattachment ||
                                                        ""
                                                      }
                                                    />
                                                  </div>
                                                ) : (
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
                                                      onChange={(e) => {
                                                        setFile(
                                                          e.target.files[0]
                                                        );
                                                      }}
                                                      value={""}
                                                    />
                                                  </div>
                                                )}
                                              </Col>
                                              {docsList.length > 0
                                                ? docsList?.map((doc) =>
                                                    doc.is_active ? (
                                                      <Col xs={6}>
                                                        <div className="mb-3">
                                                          <AvField
                                                            type="select"
                                                            name={
                                                              "docu" + doc.id
                                                            }
                                                            className="form-select"
                                                            label={
                                                              "Is " +
                                                              doc.document_name +
                                                              " Required"
                                                            }
                                                            errorMessage={
                                                              "please select " +
                                                              doc.document_name +
                                                              " required or not"
                                                            }
                                                            multiple={false}
                                                            required
                                                            onChange={
                                                              handleDocReqChange
                                                            }
                                                            value={
                                                              roleList.documentsSelected?.filter(
                                                                (docvalue) =>
                                                                  docvalue.Value ===
                                                                  doc.document_identifier
                                                              ).length > 0
                                                                ? doc.document_identifier
                                                                : "Not*" +
                                                                    doc.document_identifier ||
                                                                  ""
                                                            }
                                                          >
                                                            <option>
                                                              select Is{" "}
                                                              {
                                                                doc.document_name
                                                              }{" "}
                                                              Required?
                                                            </option>
                                                            <option
                                                              value={
                                                                doc.document_identifier
                                                              }
                                                            >
                                                              Required
                                                            </option>
                                                            <option
                                                              value={
                                                                "Not*" +
                                                                doc.document_identifier
                                                              }
                                                            >
                                                              Not Required
                                                            </option>
                                                          </AvField>
                                                        </div>
                                                      </Col>
                                                    ) : (
                                                      ""
                                                    )
                                                  )
                                                : ""}
                                            </Row>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <label>Link Assets</label>
                                                  <DropdownMultiselect
                                                    placeholder="select asset/assets"
                                                    buttonClass="btn-light"
                                                    selectDeselectLabel="Select/Deselect All"
                                                    required={true}
                                                    value={""}
                                                    options={assetlist}
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
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <label>Link Groups</label>
                                                  <DropdownMultiselect
                                                    placeholder="select Group/Groups"
                                                    buttonClass="btn-light"
                                                    selectDeselectLabel="Select/Deselect All"
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
