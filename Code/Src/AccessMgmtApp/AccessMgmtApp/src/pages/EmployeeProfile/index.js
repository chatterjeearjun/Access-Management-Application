import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Container, Row } from "reactstrap";
//import components
import EmployeeProfileHeader from "./ProfileHeader";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { getEmployeeProfile as onGetEmployee } from "../../store/actions";
//redux
import { useSelector, useDispatch } from "react-redux";

const EmployeeProfile = (props) => {
  const dispatch = useDispatch();
  const id = window.location.search.slice(1);
  const { employee } = useSelector((state) => ({
    employee: state.employeeProfileReducer.employee,
  }));
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    if (employee && !employee.length) {
      dispatch(onGetEmployee(id));
    }
  }, []);

  useEffect(() => {
    setEmployeeData(employee);
  }, [employee]);

  return (
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
            <EmployeeProfileHeader data={employeeData} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EmployeeProfile;
