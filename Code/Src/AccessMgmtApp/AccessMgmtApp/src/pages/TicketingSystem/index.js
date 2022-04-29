import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap";

import {
  getTickets as onGetTickets,
  updateTicket as onUpdateTicket,
  deleteTicket as onDeleteTicket,
} from "../../store/actions";

import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

//redux
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { AvForm, AvField } from "availity-reactstrap-validation";
import SweetAlert from "react-bootstrap-sweetalert";

const TicketingSystem = () => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false),
    [isEdit, setIsEdit] = useState(false),
    [ticketsList, setTicketsList] = useState(false),
    [deleteAlert, setDeleteAlert] = useState(false),
    [deleteRow, setDeleteRow] = useState([]);

  const { SearchBar } = Search;

  const { tickets, employees } = useSelector((state) => ({
    tickets: state.ticketingSystem.tickets,
    employees: state.employeesManagement.users,
  }));

  useEffect(() => {
    dispatch(onGetTickets());
  }, [dispatch]);

  useEffect(() => {
    setTicketsList(tickets);
    setIsEdit(false);
  }, [tickets]);

  const pageOptions = {
    sizePerPage: 10,
    totalSize: tickets.length,
    custom: true,
  };

  const defaultSorted = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ];
  const csvProps = {
    fileName: "test",
    ignoreHeader: false,
    noAutoBOM: false,
    exportAll: true,
    onlyExportSelection: true,
    onlyExportFiltered: true,
  };
  const selectRow = {
    mode: "checkbox",
  };
  const statusColor = {
    New: "bg-primary",
    InProgress: "bg-info",
    OnHold: "bg-danger",
    Done: "bg-success",
  };
  const statusColorLight = {
    New: "bg-soft-primary",
    InProgress: "bg-soft-info",
    OnHold: "bg-soft-danger",
    Done: "bg-soft-success",
  };
  const statusRowColorLight = {
    New: "table-primary",
    InProgress: "table-info",
    OnHold: "table-danger",
    Done: "table-success",
  };

  const ticketsListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      formatter: (cellContent, tickets) => <>{tickets.ticketId}</>,
    },
    {
      text: "Ticket ID",
      dataField: "ticket_identifier",
      sort: true,
      formatter: (cellContent, tickets) => (
        <>{tickets.ticket_identifier.split("-")[0]}</>
      ),
    },
    {
      text: "Subject",
      dataField: "ticket_subject",
      sort: true,
      formatter: (cellContent, tickets) => <>{tickets.ticket_subject}</>,
    },
    {
      text: "Ticket Content",
      dataField: "ticket_content",
      sort: true,
      formatter: (cellContent, tickets) => <>{tickets.ticket_content}</>,
    },
    {
      text: "Ticket Owner",
      dataField: "ticket",
      sort: true,
      formatter: (cellContent, tickets) => (
        <>
          {
            employees?.filter(
              (employee) =>
                employee.employee_identifier === tickets.ticket_user_guid
            )[0]?.emp_first_name
          }
        </>
      ),
    },
    {
      text: "Comments",
      dataField: "ticketComments",
      sort: true,
      formatter: (cellContent, tickets) => (
        <>
          {tickets.ticketComments.map((comment) => (
            <>
              <span
                className={"badge badge-soft-primary font-size-10 mx-1"}
                key={comment.comment_identifier.slice(0, 10)}
              >
                {comment.comment_content}
              </span>{" "}
              <br />{" "}
            </>
          ))}
        </>
      ),
    },
    {
      text: "Status",
      dataField: "ticket_status",
      sort: true,
      formatter: (cellContent, tickets) => (
        <>
          <span
            className={
              "badge " + statusColor[tickets.ticket_status] + " font-size-13"
            }
          >
            {tickets.ticket_status}
          </span>
        </>
      ),
    },
    {
      text: "Created Date",
      dataField: "created_date",
      sort: true,
      formatter: (cellContent, tickets) => (
        <>{moment(tickets.created_date).format("YYYY-MM-DD")}</>
      ),
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (cellContent, ticket) => (
        <div className="btn-group me-2 mb-2 mb-sm-0">
          <Button
            type="button"
            color="primary"
            className="waves-light waves-effect cursor-not-allowed"
            disabled
          >
            <i className="fa fa-eye font-size-12" />
          </Button>
          <Button
            type="button"
            color="success"
            className="waves-light waves-effect"
            onClick={() => handleTicketClick(ticket)}
          >
            <i className="mdi mdi-pencil font-size-15" id="edittooltip" />
          </Button>
          <Button
            type="button"
            color="danger"
            className="waves-light waves-effect cursor-not-allowed"
            disabled
            //       onClick={() => {
            //         setDeleteAlert(true);
            //         setDeleteRow(ticket);
            //       }}
          >
            <i className="far fa-trash-alt font-size-12" id="deletetooltip" />
          </Button>
        </div>
        // <div className="d-flex gap-3">
        //   {/* <Link className="text-primary" to="#">
        //     <i
        //       className="mdi mdi-eye font-size-18"
        //       id="edittooltipp"
        //       //onClick={() => handleTicketClick(ticket)}
        //     ></i>
        //   </Link> */}
        //   <Link className="text-success" to="#">
        //     <i
        //       className="mdi mdi-pencil font-size-18"
        //       id="edittooltip"
        //       onClick={() => handleTicketClick(ticket)}
        //     ></i>
        //   </Link>
        //   {/* <Link className="text-danger" to="#">
        //     <i
        //       className="mdi mdi-delete font-size-18"
        //       id="deletetooltip"
        //       onClick={() => {
        //         setDeleteAlert(true);
        //         setDeleteRow(ticket);
        //       }}
        //     ></i>
        //   </Link> */}
        // </div>
      ),
    },
  ];
  const toggle = () => {
    setModal(!modal);
    if (!modal && !!isEdit) {
      setTimeout(() => {
        setIsEdit(false);
      }, 500);
    }
  };
  const handleValidTicketSubmit = (e, values) => {
    if (isEdit) {
      const updateTicket = {
        ticket_identifier: ticketsList.ticketnum,
        company_identifier: ticketsList.companyguid,
        ticket_subject: values["subject"],
        ticket_content: values["content"],
        ticket_status: 1,
        ticket_user_guid: ticketsList.user,
        ticket_agent_guid: ticketsList.approver,
        ticket_html: "",
        comment_content: values["comment"],
        comment_html: "",
        comment_user_guid: ticketsList.approver,
      };
      // update ticket
      dispatch(onUpdateTicket(updateTicket));
      setIsEdit(false);
    }
    toggle();
  };

  const handleTicketClick = (arg) => {
    const ticket = arg;
    setTicketsList({
      ticketnum: ticket.ticket_identifier,
      companyguid: ticket.company_identifier,
      subject: ticket.ticket_subject,
      content: ticket.ticket_content,
      status: ticket.ticket_status,
      createddate: ticket.created_date,
      user: ticket.ticket_user_guid,
      approver: ticket.ticket_agent_guid,
      owner: employees?.filter(
        (employee) => employee.employee_identifier === ticket.ticket_user_guid
      )[0]?.emp_first_name,
    });
    setIsEdit(true);
    toggle();
  };

  const handleDeleteTicket = (ticket) => {
    dispatch(onDeleteTicket(ticket));
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
          dispatch(onDeleteTicket(deleteRow));
        }}
        onCancel={() => {
          setDeleteAlert(false);
        }}
        show={deleteAlert}
      />
      <div className="page-content">
        <MetaTags>
          <title>Ticketing System | Crossleaf - Access Management</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          {/* <Breadcrumbs title="Invoices" breadcrumbItem="Invoice List" /> */}
          <Row>
            <Col lg={12} className="mb-2">
              <h5>Ticketing System</h5>
            </Col>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={tickets}
                        columns={ticketsListColumns}
                        search
                        exportCSV={csvProps}
                        columnToggle
                      >
                        {(toolkitProps) => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <div className="row align-ite  ms-center">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <h5 className="card-title">
                                      Current Tickets{" "}
                                      <span className="text-muted fw-normal ms-2">
                                        ({pageOptions.totalSize})
                                      </span>
                                    </h5>
                                  </div>
                                </div>

                                {/* <div className="col-md-6">
                                  <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                                    <div>
                                      <Link to="#" className="btn btn-light">
                                        <i className="bx bx-plus me-1"></i>
                                        New Ticket
                                      </Link>
                                    </div>
                                  </div>
                                </div> */}
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
                                      "table align-middle table-wrap table-hover table-responsive"
                                    }
                                    responsive
                                    bordered={false}
                                    striped={false}
                                  />
                                  <Modal
                                    isOpen={modal}
                                    toggle={toggle}
                                    size="xl"
                                    scrollable={true}
                                  >
                                    <ModalHeader toggle={toggle} tag="h4">
                                      {!!isEdit ? "Edit Ticket" : "Add Ticket"}
                                    </ModalHeader>
                                    <ModalBody>
                                      <AvForm
                                        onValidSubmit={handleValidTicketSubmit}
                                      >
                                        <Row form>
                                          <Col xs={12}>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="ticketnum"
                                                    label="Ticket Number"
                                                    placeholder="ticket number"
                                                    type="text"
                                                    errorMessage="please provide valid ticket number"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      ticketsList.ticketnum ||
                                                      ""
                                                    }
                                                    disabled
                                                  />
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="status"
                                                    label="Ticket Status"
                                                    placeholder="ticket subject..."
                                                    type="text"
                                                    errorMessage="please provide valid ticket status"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      ticketsList.status || ""
                                                    }
                                                    disabled
                                                    className={`${
                                                      statusColorLight[
                                                        ticketsList.status
                                                      ]
                                                    } text-dark`}
                                                  />
                                                </div>
                                              </Col>
                                            </Row>

                                            <Row>
                                              <Col xs={12}>
                                                <Row>
                                                  <Col xs={6}>
                                                    <div className="mb-3">
                                                      <AvField
                                                        name="content"
                                                        label="Ticket Content"
                                                        placeholder="ticket content..."
                                                        type="textarea"
                                                        errorMessage="please provide valid ticket content"
                                                        validate={{
                                                          required: {
                                                            value: true,
                                                          },
                                                        }}
                                                        value={
                                                          ticketsList.content ||
                                                          ""
                                                        }
                                                      />
                                                    </div>
                                                  </Col>
                                                  <Col xs={6}>
                                                    <div className="mb-3">
                                                      <AvField
                                                        name="subject"
                                                        label="Ticket Subject"
                                                        placeholder="ticket subject..."
                                                        type="textarea"
                                                        errorMessage="please provide valid ticket subject"
                                                        validate={{
                                                          required: {
                                                            value: true,
                                                          },
                                                        }}
                                                        value={
                                                          ticketsList.subject ||
                                                          ""
                                                        }
                                                      />
                                                    </div>
                                                  </Col>
                                                </Row>
                                                <Row>
                                                  <Col xs={12}>
                                                    <Row>
                                                      <Col xs={6}>
                                                        <div className="mb-3">
                                                          <AvField
                                                            name="comment"
                                                            label="Ticket Comments"
                                                            placeholder="ticket comments..."
                                                            type="textarea"
                                                            errorMessage="please provide valid ticket comments"
                                                            value={""}
                                                          />
                                                        </div>
                                                      </Col>
                                                    </Row>
                                                  </Col>
                                                </Row>
                                              </Col>
                                            </Row>
                                          </Col>
                                        </Row>

                                        <Row>
                                          <Col>
                                            <div className="text-end">
                                              <button
                                                type="submit"
                                                className="btn btn-success save-ticket"
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

export default TicketingSystem;
