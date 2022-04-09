import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  UncontrolledTooltip,
  Container,
} from "reactstrap";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

const EmpToAssets = (props) => {
  const [employees, setEmployees] = useState([]);

  const { ExportCSVButton } = CSVExport;

  useEffect(() => {
    setEmployees(props?.data);
  }, [props?.data]);

  // const empSearch = (e) => {
  //   const filtered = props?.data?.filter(
  //     (asset) =>
  //       asset?.emp_first_name
  //         .toLowerCase()
  //         .includes(e.target.value.toLowerCase()) ||
  //       asset?.emp_last_name
  //         .toLowerCase()
  //         .includes(e.target.value.toLowerCase()) ||
  //       asset?.emp_email.toLowerCase().includes(e.target.value.toLowerCase())
  //   );
  //   if (filtered?.length > 0) {
  //     setEmployees(filtered);
  //   } else setEmployees([]);
  // };
  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize: employees?.length, // replace later with size(employees),
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

  const employeeListColumns = [
    {
      text: "id",
      sort: true,
      hidden: true,
    },
    {
      dataField: "emp_first_name",
      text: "First Name",
      sort: true,
    },
    {
      dataField: "emp_last_name",
      text: "Last Name",
      sort: true,
    },
    {
      dataField: "emp_email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "emp_role",
      text: "Role",
      sort: true,
    },
  ];

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="mb-0 h5 align-middle">
                {`Asset Mapping To ${employees?.length} Employees`}
              </CardTitle>
              {/* <div className="grid-structure">
                <Row>
                  <div className="col-lg-8">
                    <div className="grid-container">
                      <CardTitle className="mb-0 h5 align-middle">
                        {`Asset Mapping To ${employees?.length} Employees`}
                      </CardTitle>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="grid-container">
                      <form className="app-search">
                        <input
                          className="form-control"
                          type="search"
                          name="empsearch"
                          id="empsearch"
                          placeholder="Search Employees..."
                          onChange={empSearch}
                        />
                      </form>
                    </div>
                  </div>
                </Row>
              </div> */}
            </CardHeader>
            <CardBody className="align-middle">
              <div className="p-3">
                <Container fluid>
                  <Row>
                    <Col lg="12">
                      <PaginationProvider
                        pagination={paginationFactory(pageOptions)}
                        keyField="id"
                        columns={employeeListColumns}
                        data={employees}
                      >
                        {({ paginationProps, paginationTableProps }) => (
                          <ToolkitProvider
                            keyField="id"
                            data={employees}
                            columns={employeeListColumns}
                            search
                            exportCSV={{
                              fileName: "custom.csv",
                              separator: "|",
                              ignoreHeader: true,
                              noAutoBOM: false,
                              onlyExportSelection: true,
                            }}
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
                                            ({employees.length})
                                          </span>
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                  <Col sm="4">
                                    <div className="search-box ms-2 mb-2 d-inline-block">
                                      <div className="position-relative">
                                        <SearchBar
                                          {...toolkitProps.searchProps}
                                        />
                                        <i className="bx bx-search-alt search-icon-search" />
                                      </div>
                                    </div>
                                  </Col>
                                  <Col sm="4">
                                    <div className="ms-2 mb-2 d-inline-block">
                                      <div className="position-relative">
                                        <ExportCSVButton
                                          {...toolkitProps.searchProps}
                                        >
                                          Export Csv
                                        </ExportCSVButton>
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
                                        classes={
                                          "table align-middle table-nowrap"
                                        }
                                        noDataIndication="No Employees Mapped"
                                        headerWrapperClasses={"thead-light"}
                                        {...toolkitProps.baseProps}
                                        {...paginationTableProps}
                                      />
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
                    </Col>
                  </Row>
                </Container>
              </div>
              {/* <div>
                <div className="pb-3">
                  <Row className="align-middle">
                    <Col xs={12} className="align-middle">
                      <div className="m-2">
                        {employees?.length > 0
                          ? employees?.map((data) => (
                              <>
                                <Link
                                  to={`/EmployeeProfile?${data.employee_identifier}`}
                                  className="badge badge-soft-primary m-1 p-2"
                                  id={`mappings${data.id}`}
                                >
                                  {data.emp_first_name} {data.emp_last_name}
                                </Link>
                                <UncontrolledTooltip
                                  placement="top"
                                  target={`mappings${data.id}`}
                                >
                                  {data.emp_email}
                                </UncontrolledTooltip>
                              </>
                            ))
                          : "No Employees Found"}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div> */}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EmpToAssets;
