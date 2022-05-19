import React, { useEffect, useState, Fragment } from "react";
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
  getAssetsAssociation as onGetAssociations,
} from "../../store/actions";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Loading from "react-fullscreen-loading";
import { getAssetsAssociation } from "../../helpers/fakebackend_helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

const AssetsManagement = (props) => {
  const dispatch = useDispatch();

  const { assets, result } = useSelector((state) => ({
    assets: state.assetsManagement.assets,
    result: state.assetsManagement.result,
  }));
  const { owners } = useSelector((state) => ({
    owners: state.employeesManagement.users,
  }));
  const [assetList, setAssetList] = useState([]);
  const [ownersList, setOwnersList] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [typeaheadList, setTypeaheadList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //const [isLoader, setIsLoader] = useState(false);
  // Array options
  const selectOptionsArr = [];

  for (var i = 0; i < assetList?.length; i++) {
    selectOptionsArr[i] = {
      label: assetList[i]?.name,
      value: assetList[i]?.assetid,
    };
  }

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
      text: "Serial No",
      dataField: "asset_id",
      sort: true,
      // formatter: (cell, asset) =>
      //   selectOptionsArr.filter((opt) => opt.value === asset.id)[0]?.label ||
      //   "",
      // filter: selectFilter({
      //   options: selectOptionsArr,
      // }),
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
      formatter: (cellContent, asset) => (
        <>
          <h5 className="font-size-14 mb-1 text-dark">
            {asset?.asset_owner.indexOf("Key") !== -1
              ? JSON.parse(asset.asset_owner)?.Value
              : ""}
          </h5>
          {/* <p className="text-muted mb-0">{asset.designation}</p> */}
        </>
      ),
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
          <Link
            className="text-primary"
            to={`AssetOverview?${asset.asset_identifier}`}
          >
            <i className="mdi mdi-eye font-size-18" id="viewtooltip"></i>
          </Link>
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
  }, []);

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
      serialno: asset.asset_id,
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

  const handleDeleteAsset = async (asset) => {
    const associationCount = await getAssetsAssociation(asset);
    confirmAlert({
      title: `Deleting Asset`,
      message: `Are you sure you want to delete this Asset which is mapped to ${
        associationCount.length === 0
          ? "no"
          : associationCount[0]?.split(",").length
      } users?`,
      buttons: [
        {
          label: `${associationCount.length === 0 ? "Delete" : "Force Delete"}`,
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
        asset_id: values["assetserialno"],
        asset_name: values["name"],
        asset_type: values["type"],
        asset_owner: assetList.owner,
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
        asset_description_attachment: assetList.descattach,
      };
      // update asset
      dispatch(onUpdateAsset(updateAsset));
      setIsEdit(false);
    } else {
      setIsLoading(true);
      const newAsset = {
        company_identifier: "6C0276EC-FEA1-4FA8-BB1F-5D428A850222", //JSON.parse(localStorage.getItem("authUser")).companyID,
        asset_id: values["assetserialno"],
        asset_name: values["name"],
        asset_type: values["type"],
        asset_owner: selectedOwner,
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
        asset_description_attachment: file,
      };
      // save new asset
      dispatch(onAddNewAsset(newAsset));
    }
    toggle();
  };
  useEffect(() => {
    if (result != null && result === "Add Asset Success") {
      setIsLoading(false);
    }
  }, [result, isLoading]);

  const handleAssetClicks = () => {
    setAssetList("");
    setIsEdit(false);
    toggle();
  };

  const ownerchange = (selectedOption) => {
    setSelectedOwner(selectedOption[0]?.employee_identifier);
  };
  const [file, setFile] = useState();

  if (result === "Asset Deleted") {
    toast("Asset Deleted Successfully !", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      toastId: "007",
    });
  }
  // if (result === "Asset Added") {
  //   setIsLoader(false);
  // }
  // if (assetList.length > 0) {
  //   (assetList, "hsdgfiuywehwkej76");
  //   for (var i = 0; i < assetList.length; i++) {
  //     selectOptions[i] = {
  //       label: assetList[i]?.name,
  //       value: assetList[i]?.name,
  //     };
  //   }
  // }
  const filterBy = () => true;
  const handleSearch = (query) => {
    //
    setTypeaheadList([]);
    setIsLoading(true);
    const list = owners?.filter(
      (item) =>
        item.emp_email.toLowerCase().includes(query.toLowerCase()) ||
        item.emp_first_name.toLowerCase().includes(query.toLowerCase()) ||
        item.emp_last_name.toLowerCase().includes(query.toLowerCase())
    );

    if (list.length > 0) {
      setTypeaheadList(list);
      setIsLoading(false);
    } else {
      setTypeaheadList([]);
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Loading
        loading={isLoading}
        background="#ffffffcc"
        loaderColor="#5156be"
      />
      <div className="page-content">
        <MetaTags>
          <title>Assets | Crossleaf - Access Management</title>
        </MetaTags>
        {/* {isLoader === true ? (
          <LoadingOverlay active={true} spinner={<BounceLoader />}>
            Adding...
          </LoadingOverlay>
        ) : (
          ""
        )} */}
        <Container fluid>
          {/* Render Breadcrumbs */}
          {/* <Breadcrumbs title="Assets" breadcrumbItem="Asset List" /> */}
          <ToastContainer />
          <Row>
            <Col lg={12} className="mb-2">
              <h5>Asset List</h5>
            </Col>
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
                                    classes={"table"}
                                    headerWrapperClasses={"thead-dark"}
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                    columnFilter
                                    // filter={filterFactory()}
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
                                                    name="assetserialno"
                                                    label="Asset Serial No"
                                                    placeholder="Asset Serial No"
                                                    type="text"
                                                    maxLength={6}
                                                    errorMessage="please provide valid asset serial no"
                                                    // disabled={
                                                    //   isEdit ? true : false
                                                    // }
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      assetList.serialno || ""
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
                                            </Row>
                                            <Row>
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

                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <Label
                                                    htmlFor="owners"
                                                    className="form-Label"
                                                  >
                                                    Asset Owner
                                                  </Label>
                                                  <AsyncTypeahead
                                                    inputProps={{
                                                      required: true,
                                                      "aria-errormessage":
                                                        "Please select asset owner",
                                                    }}
                                                    filterBy={filterBy}
                                                    id="ownersearch"
                                                    isLoading={isLoading}
                                                    labelKey="emp_email"
                                                    minLength={3}
                                                    onSearch={handleSearch}
                                                    options={typeaheadList}
                                                    placeholder="Search for a Asset Owner..."
                                                    onChange={ownerchange}
                                                    //onInputChange={ownerchange}
                                                    renderMenuItemChildren={(
                                                      option,
                                                      props
                                                    ) => (
                                                      <Fragment>
                                                        <span>
                                                          {option.emp_email}
                                                        </span>
                                                      </Fragment>
                                                    )}
                                                  />
                                                </div>
                                              </Col>
                                            </Row>
                                            <Row>
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
                                            </Row>
                                            <Row>
                                              <Col xs={6}>
                                                {isEdit ? (
                                                  <div className="mb-3">
                                                    <AvField
                                                      name="assetattach"
                                                      label="Asset Info"
                                                      type="text"
                                                      //mask="99/99/9999"
                                                      disabled={true}
                                                      errorMessage="please select asset info attachment"
                                                      validate={{
                                                        required: {
                                                          value: true,
                                                        },
                                                      }}
                                                      value={
                                                        assetList.descattach ||
                                                        ""
                                                      }
                                                    />
                                                  </div>
                                                ) : (
                                                  <div className="mb-3">
                                                    <AvField
                                                      name="assetinfo"
                                                      label="Asset Info"
                                                      inputClass="form-control"
                                                      type="file"
                                                      errorMessage="please provide valid file"
                                                      value={""}
                                                      onChange={(e) => {
                                                        setFile(
                                                          e.target.files[0]
                                                        );
                                                      }}
                                                    />
                                                  </div>
                                                )}
                                              </Col>

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
                                            </Row>
                                            <Row>
                                              <Col xs={6}>
                                                {isEdit ? (
                                                  <div className="mb-3">
                                                    <AvField
                                                      type="select"
                                                      name="status"
                                                      className="form-select"
                                                      label="Asset Current Status"
                                                      errorMessage="please select asset current status"
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
