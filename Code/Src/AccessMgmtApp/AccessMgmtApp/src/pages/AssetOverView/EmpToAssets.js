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
  FormGroup,
  Input,
} from "reactstrap";

const EmpToAssets = (props) => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    setAssets(props?.data);
  }, [props?.data]);

  const empSearch = (e) => {
    const filtered = props?.data?.filter(
      (asset) =>
        asset?.emp_first_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        asset?.emp_last_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        asset?.emp_email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (filtered?.length > 0) {
      setAssets(filtered);
    } else setAssets([]);
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card className="shadow-sm">
            <CardHeader>
              <Row>
                <Col xs={8}>
                  <CardTitle className="mb-0 h5 align-middle">
                    {`Asset Mapping To ${assets?.length} Employees`}
                  </CardTitle>
                </Col>
                <Col xs={4}>
                  <FormGroup>
                    <Input
                      type="search"
                      name="empsearch"
                      id="empsearch"
                      placeholder="search employees"
                      onChange={empSearch}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="align-middle mx-auto">
              <div>
                <div className="pb-3">
                  <Row className="align-middle">
                    <Col xs={12} className="align-middle">
                      <div className="m-2">
                        {assets?.length > 0
                          ? assets?.map((data) => (
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
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EmpToAssets;
