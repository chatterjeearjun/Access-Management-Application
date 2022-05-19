import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";

import ReactApexChart from "react-apexcharts";

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  FormGroup,
  Label,
} from "reactstrap";

import CountUp from "react-countup";

/** import Mini Widget data */
import { WidgetsData } from "../../common/data/dashboard";
import TicketsPie from "./TicketsPie";
import AuditsPie from "./AuditsPie";
import UsersApproval from "./UsersApproval";
import ApprovalStatusList from "./ApprovalStatusList";
import SystemHealth from "./SystemHealth";
import {
  getDashboardData as ongetDashData,
  getUsers as onGetUsers,
} from "../../store/actions";
//redux
import { useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { IoCalendar } from "react-icons/io5";

const options = {
  chart: {
    height: 50,
    type: "line",
    toolbar: { show: false },
  },
  colors: ["#5156be"],
  stroke: {
    curve: "smooth",
    width: 2,
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function (seriesName) {
          return "";
        },
      },
    },
    marker: {
      show: false,
    },
  },
};
const Dashboard = () => {
  const [data, setData] = useState([]),
    [dateRange, setDateRange] = useState([
      moment(new Date()).subtract(1, "months").format("YYYY-MM-DD"),
      moment(new Date()).add(1, "days").format("YYYY-MM-DD"),
    ]);

  const dispatch = useDispatch();
  const { users, result } = useSelector((state) => ({
    users: state.employeesManagement.users,
    result: state.employeesManagement.result,
  }));
  const { dData } = useSelector((state) => ({
    dData: state.dashboardManagement.dashboard,
  }));

  useEffect(() => {
    if (dData && !dData.length) {
      dispatch(
        ongetDashData([
          moment.utc(dateRange[0]).format(),
          moment.utc(dateRange[1]).format(),
        ])
      );
    }
  }, []);

  useEffect(() => {
    setData(dData);
  }, [dData]);

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers());
    }
  }, []);

  const DatesRange = (selectedDates) => {
    setDateRange(
      selectedDates.map((date) => moment(date).format("YYYY-MM-DD"))
    );
    dispatch(
      ongetDashData([
        moment.utc(dateRange[0]).format(),
        moment.utc(dateRange[1]).format(),
      ])
    );
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | Crossleaf - Access Management</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          {/* <Breadcrumbs title="Dashboard" breadcrumbItem="Dashboard" /> */}
          <Row className="justify-content-between align-items-center">
            <Col xs={6}>
              <h5>Dashboard</h5>
            </Col>
            <Col xs={3} sm={12} md={6} lg={4}>
              <FormGroup className="mb-4">
                <Label>Date Range</Label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text bg-primary"
                      id="basic-addon1"
                    >
                      <IoCalendar
                        style={{ fontSize: "x-large" }}
                        className="text-white"
                      />
                    </span>
                  </div>
                  <Flatpickr
                    className="form-control d-block"
                    placeholder="Date Range to show data on dashboard"
                    options={{
                      mode: "range",
                      dateFormat: "Y-m-d",
                      //maxDate: new Date(),
                      onChange: (selectedDates) => {
                        DatesRange(selectedDates);
                      },
                      defaultDate: dateRange,
                      animate: true,
                    }}
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {(WidgetsData(data) || []).map((widget, key) => (
              <Col xl={3} md={6} key={key}>
                <Card className="card-h-100">
                  <CardBody>
                    <Row className="align-items-center">
                      <Col xs={6}>
                        <span className="text-muted mb-3 lh-1 d-block">
                          {widget.title}
                        </span>
                        <h4 className="mb-3">
                          {widget.isDoller === true ? "$" : ""}
                          <span className="counter-value">
                            <CountUp
                              start={0}
                              end={widget.price}
                              duration={2}
                            />
                            {widget.postFix}
                          </span>
                        </h4>
                      </Col>
                      {widget.id !== 1 && widget.id !== 2 ? (
                        <Col xs={6}>
                          <ReactApexChart
                            options={options}
                            series={[{ data: [...widget["series"]] }]}
                            type="line"
                            className="apex-charts"
                            dir="ltr"
                          />
                        </Col>
                      ) : (
                        ""
                      )}
                    </Row>
                    <div className="text-wrap">
                      <span
                        className={
                          "badge badge-soft-" +
                          widget.statusColor +
                          " text-" +
                          widget.statusColor
                        }
                      >
                        {widget.rank}
                      </span>
                      {widget?.id === 1 || widget?.id === 2 ? (
                        <span className="badge badge-soft-danger text-danger mx-2">
                          {widget.expiry}
                        </span>
                      ) : (
                        ""
                      )}
                      <span className="ms-1 text-muted font-size-13">
                        Since last month
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            <UsersApproval data={dData} dateRange={dateRange} />
            <TicketsPie data={dData} />
            <AuditsPie data={dData} />
            <SystemHealth data={dData} />
          </Row>
          <Row>
            <ApprovalStatusList data={dData} />
          </Row>
          {/* <Row>
            <WalletBalance />
            <Col>
              <Row>
                <InvestedOverview />
                <NewSlider />
              </Row>
            </Col>
          </Row>
          <Row>
            <MarketOverview />
            <Locations />
          </Row>
          <Row>
            <Trading />
            <Transactions />
            <RecentActivity />
          </Row> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
