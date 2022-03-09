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

import {
  getApprovers as onGetApprovers,
  addNewApprover as onAddNewApprover,
  updateApprover as onUpdateApprover,
  deleteApprover as onDeleteApprover,
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

  const [approverList, setApproverList] = useState([]);
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
      dataField: "approver_name",
      sort: true,
      formatter: (cellContent, approver) => (
        <>
          <h5 className="font-size-14 mb-1 text-dark">
            {approver.approver_name}
          </h5>
          {/* <p className="text-muted mb-0">{approver.designation}</p> */}
        </>
      ),
    },
    {
      dataField: "approver_role",
      text: "Approver Role",
      sort: true,
    },
    {
      dataField: "approver_email",
      text: "Approver Email",
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
      id: approver.id,
      name: approver.approver_name,
      designation: approver.approver_role,
      email: approver.approver_email,
      startdate: approver.created_date.split("T")[0],
    });
    setIsEdit(true);

    toggle();
  };

  const handleDeleteApprover = (approver) => {
    const del = dispatch(onDeleteApprover(approver));
    console.log(del);
  };

  /**
   * Handling submit approver on approver form
   */
  const handleValidApproverSubmit = (e, values) => {
    if (isEdit) {
      const updateApprover = {
        id: approverList.id,
        approver_name: values["name"],
        approver_email: values["email"],
        approver_role: values["designation"],
        created_date: moment(values["startdate"]).format().slice(0, 19),
      };
      console.log(moment(values["startdate"]).format().slice(0, 19));
      // update approver
      dispatch(onUpdateApprover(updateApprover));
      setIsEdit(false);
    } else {
      const newApprover = {
        id: 0,
        approver_name: values["name"],
        approver_email: values["email"],
        approver_role: values["designation"],
        created_date: new Date(
          values["startdate"].split("-")[0],
          values["startdate"].split("-")[1],
          values["startdate"].split("-")[2]
        )
          .toISOString()
          .slice(0, 19),
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
          <title>Approvers | Crossleaf - Access Management</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Approvers" breadcrumbItem="Approver List" />
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
                                      Current Approvers{" "}
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
                                        Approver
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

                                  <Modal isOpen={modal} toggle={toggle}>
                                    <ModalHeader toggle={toggle} tag="h4">
                                      {!!isEdit
                                        ? "Edit Approver"
                                        : "Add Approver"}
                                    </ModalHeader>
                                    <ModalBody>
                                      <AvForm
                                        onValidSubmit={
                                          handleValidApproverSubmit
                                        }
                                      >
                                        <Row form>
                                          <Col xs={12}>
                                            <div className="mb-3">
                                              <AvField
                                                name="name"
                                                label="Name"
                                                placeholder="approver name"
                                                type="text"
                                                errorMessage="please provide valid name"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                value={approverList.name || ""}
                                              />
                                            </div>
                                            <div className="mb-3">
                                              <AvField
                                                name="email"
                                                label="Email"
                                                placeholder="acs@crossleaf.ca"
                                                type="email"
                                                errorMessage="please provide valid Email"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                value={approverList.email || ""}
                                              />
                                            </div>
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
                                                  approverList.designation || ""
                                                }
                                              >
                                                <option>
                                                  select role/designation
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
                                              </AvField>
                                            </div>
                                            <div className="mb-3">
                                              <AvField
                                                name="startdate"
                                                label="Start Date"
                                                type="date"
                                                // disabled={true}
                                                mask="99/99/9999"
                                                errorMessage="please select start date"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                value={
                                                  approverList.startdate || ""
                                                }
                                              />
                                            </div>
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
