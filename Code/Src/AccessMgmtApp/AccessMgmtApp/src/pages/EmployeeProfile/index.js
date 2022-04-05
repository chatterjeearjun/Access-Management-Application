import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import ProfileHeader from "./ProfileHeader";

const EmployeeProfile = () => {
  //apply base url for axios
  const API_URL = "https://localhost:5001";
  const id = window.location.search.slice(1);

  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${API_URL}/api/Employee/${id !== null && id !== undefined ? id : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      setEmployeeData(json);
    };
    fetchData();
  }, []);

  return employeeData != null && employeeData !== undefined ? (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Employee Profile | Crossleaf - Access Management</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Employees"
            breadcrumbItem="Employee Profile"
            url="EmployeeManagement"
          />

          <Row>
            {/* Render profilemenu */}
            <ProfileHeader data={employeeData} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  ) : (
    ""
  );
};

export default withRouter(EmployeeProfile);
