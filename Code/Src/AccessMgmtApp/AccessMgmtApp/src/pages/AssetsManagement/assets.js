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
  Input,
  Label,
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
  getUsers as onGetUsers,
} from "../../store/actions";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const AssetsManagement = (props) => {
  const dispatch = useDispatch();

  const { assets } = useSelector((state) => ({
    assets: state.assetsManagement.assets,
  }));
  const { owners } = useSelector((state) => ({
    owners: state.contacts.users,
  }));

  const [assetList, setAssetList] = useState([]);
  const [ownersList, setOwnersList] = useState([]);
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

  const assetListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      formatter: (cellContent, asset) => <>{asset.id}</>,
    },
    {
      text: "Asset ID",
      dataField: "asset_identifier",
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
      text: "First Active Date",
      dataField: "alocation_start_date",
      sort: true,
      formatter: (cellContent, asset) => (
        <>{asset.alocation_start_date?.split("T")[0]}</>
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
      isDummyField: false,
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

  //Getting Users
  useEffect(() => {
    if (owners && !owners.length) {
      dispatch(onGetUsers());
    }
  }, [dispatch, owners]);

  useEffect(() => {
    setOwnersList(owners);
  }, [owners]);

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
      id: asset.asset_identifier,
      companyid: asset.company_identifier,
      assetid: asset.asset_id,
      name: asset.asset_name,
      type: asset.asset_type,
      owner: asset.asset_owner,
      description: asset.asset_description,
      location: asset.asset_location,
      ranking: asset.asset_risk_ranking,
      descattach: asset.asset_description_attachment,
      status: asset.is_active === true ? "Active" : "Expired",
      nda: asset.is_mda_required,
      bc: asset.is_bc_required,
      certificates: asset.certification_required,
      assigndate: asset.created_date?.split("T")[0],
      fstartdate: asset.alocation_start_date?.split("T")[0],
      edate: asset.alocation_end_date?.split("T")[0],
    });
    setIsEdit(true);

    toggle();
  };

  const handleDeleteAsset = (asset) => {
    confirmAlert({
      title: "Deleting Asset",
      message: "Are you sure you want to delete this Asset?",
      buttons: [
        {
          label: "Delete",
          onClick: () => {
            dispatch(onDeleteAsset(asset));
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
   * Handling submit asset on asset form
   */
  const handleValidAssetSubmit = (e, values) => {
    if (isEdit) {
      const updateAsset = {
        asset_identifier: assetList.id,
        company_identifier: assetList.companyid,
        asset_name: values["name"],
        asset_type: values["type"],
        asset_owner: values["owner"],
        asset_description: values["description"],
        asset_location: values["location"],
        asset_risk_ranking: values["riskranking"],
        is_active: values["status"] === "Active" ? true : false,
        modified_date: moment().format().slice(0, 19),
        modified_by: JSON.parse(localStorage.getItem("authUser")).username,
        // is_mda_required: values["nda"],
        // is_bc_required: values["bc"],
        // certification_required: values["certificates"],
        alocation_start_date: moment(assetList.fstartdate)
          .add(1, "day")
          .startOf("day")
          .toISOString()
          .replace(/T.*/gi, "T00:00:00.000Z"),
        alocation_end_date: moment(values["enddate"])
          .add(1, "day")
          .startOf("day")
          .toISOString()
          .replace(/T.*/gi, "T00:00:00.000Z"),
      };
      // update asset
      dispatch(onUpdateAsset(updateAsset));
      setIsEdit(false);
    } else {
      const newAsset = {
        company_identifier: JSON.parse(localStorage.getItem("authUser"))
          .companyID,
        asset_name: values["name"],
        asset_type: values["type"],
        asset_owner: values["owner"],
        asset_description: values["description"],
        asset_location: values["location"],
        created_date: moment().format().slice(0, 19),
        asset_risk_ranking: values["riskranking"],
        is_active: true,
        created_by: JSON.parse(localStorage.getItem("authUser")).username,
        // is_mda_required: values["nda"],
        // is_bc_required: values["bc"],
        // certification_required: values["certificates"],
        alocation_start_date: moment(values["fstartdate"])
          .add(1, "day")
          .startOf("day")
          .toISOString()
          .replace(/T.*/gi, "T00:00:00.000Z"),
        alocation_end_date: moment(values["enddate"])
          .add(1, "day")
          .startOf("day")
          .toISOString()
          .replace(/T.*/gi, "T00:00:00.000Z"),
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
                    columns={assetListColumns}
                    data={assets}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={assets}
                        columns={assetListColumns}
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
                                    TableChangeType={"filter"}
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
                                              {/* <Col xs={6}>
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
                                              </Col> */}
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
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="description"
                                                    label="Asset Description"
                                                    placeholder="asset description"
                                                    type="textarea"
                                                    errorMessage="please provide valid description"
                                                    maxLength="200"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      assetList.description ||
                                                      ""
                                                    }
                                                  />
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="firstactive"
                                                    label="Asset First Active Date"
                                                    type="date"
                                                    disabled={
                                                      isEdit ? true : false
                                                    }
                                                    mask="99/99/9999"
                                                    errorMessage="please select asset first active date"
                                                    validate={{
                                                      required: {
                                                        value: true,
                                                      },
                                                    }}
                                                    value={
                                                      assetList.fstartdate || ""
                                                    }
                                                  />
                                                </div>
                                              </Col>
                                              <Col xs={6}>
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
                                                    value={
                                                      assetList.location || ""
                                                    }
                                                  />
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  {/* <AvField
                                                    name="owner"
                                                    label="Asset Owner"
                                                    placeholder="Asset Owner"
                                                    type="datalist"
                                                    errorMessage="please provide valid asset ower"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      assetList.owner || ""
                                                    }
                                                  /> */}
                                                  <Label
                                                    htmlFor="owners"
                                                    className="form-Label"
                                                  >
                                                    Asset Owner
                                                  </Label>
                                                  <Input
                                                    className="form-control"
                                                    list="ownersDatalist"
                                                    id="owners"
                                                    placeholder="Type to search owner..."
                                                    autocomplete="new-password"
                                                  />
                                                  <datalist
                                                    id="ownersDatalist"
                                                    autocomplete="off"
                                                  >
                                                    {ownersList.map((owner) => (
                                                      <option
                                                        value={owner.emp_email}
                                                        key={owner.id}
                                                      />
                                                    ))}
                                                  </datalist>
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="riskranking"
                                                    label="Asset Risk Ranking"
                                                    type="select"
                                                    errorMessage="please select asset risk ranking"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      assetList.ranking || ""
                                                    }
                                                  >
                                                    <option value="">
                                                      select asset risk ranking
                                                    </option>
                                                    <option
                                                      key={1}
                                                      value={"Low"}
                                                    >
                                                      Low
                                                    </option>
                                                    <option
                                                      key={2}
                                                      value={"Medium"}
                                                    >
                                                      Medium
                                                    </option>
                                                    <option
                                                      key={3}
                                                      value={"High"}
                                                    >
                                                      High
                                                    </option>
                                                  </AvField>
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
                                                    <option
                                                      key={1}
                                                      value={"Website"}
                                                    >
                                                      Website
                                                    </option>
                                                    <option
                                                      key={2}
                                                      value={"Tool"}
                                                    >
                                                      Tool
                                                    </option>
                                                    <option
                                                      key={3}
                                                      value={"Certificate"}
                                                    >
                                                      Certificate
                                                    </option>
                                                    <option
                                                      key={4}
                                                      value={"Software"}
                                                    >
                                                      Software
                                                    </option>
                                                    <option
                                                      key={5}
                                                      value={"Equipment"}
                                                    >
                                                      Equipment
                                                    </option>
                                                    <option
                                                      key={6}
                                                      value={"Location"}
                                                    >
                                                      Location
                                                    </option>
                                                  </AvField>
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="assetinfo"
                                                    label="Asset Info"
                                                    inputClass="form-control"
                                                    type="file"
                                                    errorMessage="please provide valid file"
                                                    value={""}
                                                  />
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="enddate"
                                                    label="Asset Expiration Date"
                                                    type="date"
                                                    mask="99/99/9999"
                                                    errorMessage="please select asset expiration date"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      assetList.edate || ""
                                                    }
                                                  />
                                                </div>
                                              </Col>
                                              <Col xs={6}>
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
                                                      value={
                                                        assetList.status || ""
                                                      }
                                                    >
                                                      <option>
                                                        select asset current
                                                        status
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
