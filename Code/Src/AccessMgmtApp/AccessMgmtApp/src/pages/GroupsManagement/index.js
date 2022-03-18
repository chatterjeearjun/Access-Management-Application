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
  getCompGroups as onGetGroups,
  addNewCompGroup as onAddNewGroup,
  updateCompGroup as onUpdateGroup,
  deleteCompGroup as onDeleteGroup,
} from "../../store/actions";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

const GroupsManagement = (props) => {
  const dispatch = useDispatch();

  const { groups } = useSelector((state) => ({
    groups: state.compGroups.groups,
  }));

  const [groupList, setGroupList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize: groups?.length, // replace later with size(groups),
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
      formatter: (cellContent, group) => <>{group.id}</>,
    },
    {
      text: "Group Name",
      dataField: "group_name",
      sort: true,
      formatter: (cellContent, group) => (
        <>
          <h5 className="font-size-14 mb-1 text-dark">{group.group_name}</h5>
          {/* <p className="text-muted mb-0">{group.designation}</p> */}
        </>
      ),
    },
    {
      dataField: "group_description",
      text: "Group Description",
      sort: true,
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (cellContent, group) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleGroupClick(group)}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => handleDeleteGroup(group)}
            ></i>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (groups && !groups.length) {
      dispatch(onGetGroups());
      setIsEdit(false);
    }
  }, [dispatch, groups]);

  useEffect(() => {
    setGroupList(groups);
    setIsEdit(false);
  }, [groups]);

  const toggle = () => {
    setModal(!modal);
    if (!modal && !isEmpty(groups) && !!isEdit) {
      setTimeout(() => {
        setGroupList(groups);
        setIsEdit(false);
      }, 500);
    }
  };

  const handleGroupClick = (arg) => {
    const group = arg;
    setGroupList({
      groupid: group.group_identifier,
      groupname: group.group_name,
      companyid: group.company_identifier,
      groupdesc: group.group_description,
      groupdescattachment: group.group_description_attachment,
      isactive: group.is_active,
      nda: group.is_mda_required === true ? "Required" : "Not Required",
      bc: group.is_bc_required === true ? "Required" : "Not Required",
      certificates:
        group.is_certification_required === true ? "Required" : "Not Required",
      expiry: group.group_end_date?.split("T")[0],
    });
    setIsEdit(true);

    toggle();
  };

  const handleDeleteGroup = (group) => {
    confirmAlert({
      title: "Deleting Group",
      message: "Are you sure you want to delete this Group?",
      buttons: [
        {
          label: "Delete",
          onClick: () => {
            dispatch(dispatch(onDeleteGroup(group)));
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
   * Handling submit group on group form
   */

  const handleValidGroupSubmit = (e, values) => {
    if (isEdit) {
      const updateGroup = {
        group_identifier: groupList.groupid,
        company_identifier: groupList.companyid,
        group_name: values["name"],
        group_description: values["description"],
        group_description_attachment: "",
        is_active: groupList.isactive,
        is_mda_required: values["nda"] === "Required" ? true : false,
        is_bc_required: values["bc"] === "Required" ? true : false,
        is_certification_required:
          values["certificates"] === "Required" ? true : false,
        group_end_date: moment(values["enddate"])
          .add(1, "day")
          .startOf("day")
          .toISOString()
          .replace(/T.*/gi, "T00:00:00.000Z"),
      };
      // update group
      dispatch(onUpdateGroup(updateGroup));
      setIsEdit(false);
    } else {
      const newGroup = {
        company_identifier: JSON.parse(localStorage.getItem("authUser"))
          .companyID,
        group_name: values["name"],
        group_description: values["description"],
        group_description_attachment: "",
        is_active: true,
        is_mda_required: values["nda"] === "Required" ? true : false,
        is_bc_required: values["bc"] === "Required" ? true : false,
        is_certification_required:
          values["certificates"] === "Required" ? true : false,
        group_end_date: moment(values["enddate"])
          .add(1, "day")
          .startOf("day")
          .toISOString()
          .replace(/T.*/gi, "T00:00:00.000Z"),
      };
      // save new group
      dispatch(onAddNewGroup(newGroup));
    }
    toggle();
  };
  const handleGroupClicks = () => {
    setGroupList("");
    setIsEdit(false);
    toggle();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Groups | Crossleaf - Access Management</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Groups" breadcrumbItem="Group List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={contactListColumns}
                    data={groups}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={groups}
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
                                      Current Groups{" "}
                                      <span className="text-muted fw-normal ms-2">
                                        ({groups.length})
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
                                        onClick={handleGroupClicks}
                                      >
                                        <i className="bx bx-plus me-1"></i> Add
                                        Group
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
                                      {!!isEdit ? "Edit Group" : "Add Group"}
                                    </ModalHeader>
                                    <ModalBody>
                                      <AvForm
                                        onValidSubmit={handleValidGroupSubmit}
                                      >
                                        <Row form>
                                          <Col xs={12}>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="name"
                                                    label="Group Name"
                                                    placeholder="group name"
                                                    type="text"
                                                    errorMessage="please provide valid name"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      groupList.groupname || ""
                                                    }
                                                  />
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="description"
                                                    label="Group Description"
                                                    placeholder="group description..."
                                                    type="textarea"
                                                    errorMessage="please provide valid Description"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      groupList.groupdesc || ""
                                                    }
                                                  />
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="groupdescattchment"
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
                                                    value={groupList.nda || ""}
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
                                                    value={groupList.bc || ""}
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
                                                      groupList.certificates ||
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
                                                  <AvField
                                                    name="enddate"
                                                    label="Group Expiration Date"
                                                    type="date"
                                                    placeholder="99/99/9999"
                                                    // disabled={true}
                                                    //mask="99/99/9999"
                                                    errorMessage="please provide valid group expiry Date"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    min={
                                                      new Date()
                                                        .toJSON()
                                                        .split("T")[0]
                                                    }
                                                    value={
                                                      groupList.expiry || ""
                                                    }
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
                                                className="btn btn-success save-group"
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

export default withRouter(GroupsManagement);
