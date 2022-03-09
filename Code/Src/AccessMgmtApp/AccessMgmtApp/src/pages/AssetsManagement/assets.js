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
  getAssets as onGetAssets,
  addNewAsset as onAddNewAsset,
  updateAsset as onUpdateAsset,
  deleteAsset as onDeleteAsset,
} from "../../store/actions";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

const AssetsManagement = (props) => {
  const dispatch = useDispatch();

  const { assets } = useSelector((state) => ({
    assets: state.contacts.assets,
  }));

  const [assetList, setAssetList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize: assets?.length, // replace later with size(assets),
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
      formatter: (cellContent, asset) => <>{asset.id}</>,
    },
    {
      text: "Asset ID",
      dataField: "asset_id",
      sort: true,
    },
    {
      text: "Asset Name",
      dataField: "asset_name",
      sort: true,
      formatter: (cellContent, asset) => (
        <>
          <h5 className="font-size-14 mb-1 text-dark">{asset.asset_name}</h5>
          {/* <p className="text-muted mb-0">{asset.designation}</p> */}
        </>
      ),
    },
    {
      text: "Asset Type",
      dataField: "asset_type",
      sort: true,
    },
    {
      text: "Asset Owner",
      dataField: "asset_owner",
      sort: true,
    },
    {
      text: "Asset Description",
      dataField: "asset_description",
      sort: true,
    },
    {
      text: "Asset Location",
      dataField: "asset_location",
      sort: true,
    },
    {
      text: "Asset Assign Date",
      dataField: "created_date",
      sort: true,
      formatter: (cellContent, asset) => (
        <>{asset.created_date.split("T")[0]}</>
      ),
    },
    {
      text: "Asset Status",
      dataField: "is_active",
      sort: true,
      formatter: (cellContent, asset) => (
        <>{asset.is_active === true ? "Active" : "Expired"}</>
      ),
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (cellContent, asset) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleAssetClick(asset)}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => handleDeleteAsset(asset)}
            ></i>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (assets && !assets.length) {
      dispatch(onGetAssets());
      setIsEdit(false);
    }
  }, [dispatch, assets]);

  useEffect(() => {
    setAssetList(assets);
    setIsEdit(false);
  }, [assets]);

  const toggle = () => {
    setModal(!modal);
    if (!modal && !isEmpty(assets) && !!isEdit) {
      setTimeout(() => {
        setAssetList(assets);
        setIsEdit(false);
      }, 500);
    }
  };

  const handleAssetClick = (arg) => {
    const asset = arg;
    setAssetList({
      id: asset.id,
      companyid: asset.company_id,
      assetid: asset.asset_id,
      name: asset.asset_name,
      type: asset.asset_type,
      owner: asset.asset_owner,
      description: asset.asset_description,
      location: asset.asset_location,
      status: asset.is_active === true ? "Active" : "Expired",
      assigndate: asset.created_date.split("T")[0],
    });
    setIsEdit(true);

    toggle();
  };

  const handleDeleteAsset = (asset) => {
    dispatch(onDeleteAsset(asset));
  };

  /**
   * Handling submit asset on asset form
   */
  const handleValidAssetSubmit = (e, values) => {
    if (isEdit) {
      const updateAsset = {
        id: assetList.id,
        company_id: assetList.companyid,
        asset_id: assetList.assetid,
        asset_name: values["name"],
        asset_type: values["type"],
        asset_owner: values["owner"],
        asset_description: values["description"],
        asset_location: values["location"],
        is_active: values["status"] === "Active" ? true : false,
        modified_date: moment().format().slice(0, 19),
        modified_by: JSON.parse(localStorage.getItem("authUser")).username,
        created_date: new Date(
          assetList.assigndate.split("-")[0],
          assetList.assigndate.split("-")[1],
          assetList.assigndate.split("-")[2]
        )
          .toISOString()
          .slice(0, 19),
      };
      // update asset
      dispatch(onUpdateAsset(updateAsset));
      setIsEdit(false);
    } else {
      const newAsset = {
        id: 0,
        company_id: 1,
        asset_id: values["assetid"],
        asset_name: values["name"],
        asset_type: values["type"],
        asset_owner: values["owner"],
        asset_description: values["description"],
        asset_location: values["location"],
        is_active: true,
        created_date: moment().format().slice(0, 19),
      };
      // save new asset
      dispatch(onAddNewAsset(newAsset));
    }
    toggle();
  };
  const handleAssetClicks = () => {
    setAssetList("");
    setIsEdit(false);
    toggle();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Assets | Crossleaf - Access Management</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Assets" breadcrumbItem="Asset List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={contactListColumns}
                    data={assets}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={assets}
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
                                      Current Assets{" "}
                                      <span className="text-muted fw-normal ms-2">
                                        ({assets.length})
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
                                        onClick={handleAssetClicks}
                                      >
                                        <i className="bx bx-plus me-1"></i> Add
                                        Asset
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
                                      {!!isEdit ? "Edit Asset" : "Add Asset"}
                                    </ModalHeader>
                                    <ModalBody>
                                      <AvForm
                                        onValidSubmit={handleValidAssetSubmit}
                                      >
                                        <Row form>
                                          <Col xs={12}>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="assetid"
                                                    label="Asset ID"
                                                    placeholder="Asset Id"
                                                    type="text"
                                                    errorMessage="please provide valid asset id"
                                                    disabled={
                                                      isEdit ? true : false
                                                    }
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      assetList.assetid || ""
                                                    }
                                                  />
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="name"
                                                    label="Asset Name"
                                                    placeholder="Asset Name"
                                                    type="text"
                                                    errorMessage="please provide valid asset name"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={assetList.name || ""}
                                                  />
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="type"
                                                    label="Asset Type"
                                                    placeholder="Asset Type"
                                                    type="select"
                                                    errorMessage="please provide valid asset type"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={assetList.type || ""}
                                                  >
                                                    <option>
                                                      select asset type
                                                    </option>
                                                    <option>Device</option>
                                                    <option>Software</option>
                                                    <option>Gadget</option>
                                                    <option>Audible</option>
                                                  </AvField>
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="owner"
                                                    label="Asset Owner Name"
                                                    placeholder="Asset Owner"
                                                    type="text"
                                                    errorMessage="please provide valid asset ower name"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      assetList.owner || ""
                                                    }
                                                  />
                                                </div>
                                              </Col>
                                            </Row>
                                            <div className="mb-3">
                                              <AvField
                                                name="description"
                                                label="Asset Description"
                                                placeholder="asset description"
                                                type="text"
                                                errorMessage="please provide valid description"
                                                maxLength="200"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                value={
                                                  assetList.description || ""
                                                }
                                              />
                                            </div>
                                            <div className="mb-3">
                                              <AvField
                                                name="location"
                                                label="Asset Location"
                                                placeholder="1234,ontario,canada,899660"
                                                type="text"
                                                errorMessage="please provide valid location"
                                                validate={{
                                                  required: { value: true },
                                                }}
                                                value={assetList.location || ""}
                                              />
                                            </div>
                                            {!isEdit ? (
                                              <div className="mb-3">
                                                <AvField
                                                  name="startdate"
                                                  label="Asset Start Date"
                                                  type="date"
                                                  // disabled={true}
                                                  mask="99/99/9999"
                                                  errorMessage="please select asset start date"
                                                  validate={{
                                                    required: { value: true },
                                                  }}
                                                  value={
                                                    assetList.startdate || ""
                                                  }
                                                />
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                            {isEdit ? (
                                              <div className="mb-3">
                                                <AvField
                                                  type="select"
                                                  name="status"
                                                  className="form-select"
                                                  label="Asset Current Status"
                                                  errorMessage="please select role/designation"
                                                  multiple={false}
                                                  required
                                                  value={assetList.status || ""}
                                                >
                                                  <option>
                                                    select asset current status
                                                  </option>
                                                  <option>Active</option>
                                                  <option>Expired</option>
                                                </AvField>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col>
                                            <div className="text-end">
                                              <button
                                                type="submit"
                                                className="btn btn-success save-asset"
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

export default withRouter(AssetsManagement);
