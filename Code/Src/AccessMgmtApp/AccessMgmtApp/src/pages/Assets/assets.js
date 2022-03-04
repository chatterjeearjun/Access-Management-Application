import React from "react";
import MetaTags from "react-meta-tags";

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
// Editable
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const products = [
  {
    id: 177845,
    description: "Laptop with mouse",
    location: "Alberta",
    owner: "Anil",
    assigndate: "10/01/2016",
    isactive: "Yes",
  },
  {
    id: 260506,
    description: "Laptop with mouse",
    location: "British Columbia",
    owner: "Bhaskar",
    assigndate: "12/02/2016",
    isactive: "Yes",
  },
  {
    id: 337702,
    description: "Laptop with mouse",
    location: "Manitoba",
    owner: "Kishore",
    assigndate: "16/03/2018",
    isactive: "No",
  },
  {
    id: 769955,
    description: "Laptop with mouse",
    location: "New Brunswick",
    owner: "Nagesh",
    assigndate: "14/04/2018",
    isactive: "Yes",
  },
  {
    id: 179352,
    description: "Laptop with mouse",
    location: "Newfoundland and Labrador",
    owner: "Daniel",
    assigndate: "18/06/2019",
    isactive: "Yes",
  },
  {
    id: 469376,
    description: "Laptop with mouse",
    location: "Nova Scotia",
    owner: "Mark",
    assigndate: "17/05/2019",
    isactive: "No",
  },
  {
    id: 218169,
    description: "Laptop with mouse",
    location: "Nunavut",
    owner: "Michel",
    assigndate: "02/04/2019",
    isactive: "Yes",
  },
  {
    id: 109229,
    description: "Laptop with mouse",
    location: "Ontario",
    owner: "Louis",
    assigndate: "13/06/2020",
    isactive: "Yes",
  },
  {
    id: 247562,
    description: "Laptop with mouse",
    location: "Willingdon",
    owner: "Zuker",
    assigndate: "19/08/2020",
    isactive: "Yes",
  },
  {
    id: 398800,
    description: "Laptop with mouse",
    location: "Drayton Valley",
    owner: "Christoper",
    assigndate: "10/07/2021",
    isactive: "Yes",
  },
];

const columns = [
  {
    dataField: "id",
    text: "Asset ID",
  },
  {
    dataField: "description",
    text: "Asset Description",
  },
  {
    dataField: "location",
    text: "Asset Location",
  },
  {
    dataField: "owner",
    text: "Asset Owner",
  },
  {
    dataField: "assigndate",
    text: "Asset Assign Date",
  },
  {
    dataField: "isactive",
    text: "Status",
  },
];

const EditableTables = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Assets | Crossleaf - Access Management</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="Assets" breadcrumbItem="Manage Assets" />

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>
                    click on the column to edit the editable fields
                  </CardTitle>

                  <div className="table-responsive">
                    <BootstrapTable
                      keyField="id"
                      data={products}
                      columns={columns}
                      cellEdit={cellEditFactory({ mode: "click" })}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditableTables;
