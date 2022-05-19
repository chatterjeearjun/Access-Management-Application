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
  Label,
} from "reactstrap";

import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";

import { AvForm, AvField } from "availity-reactstrap-validation";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

import {
  getAiEngineSettings as onGetSettings,
  addNewAiEngineSetting as onAddNewSetting,
  updateAiEngineSetting as onUpdateSetting,
} from "../../store/actions";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fields } from "./DynamicFormData";
const AssetsManagement = (props) => {
  const dispatch = useDispatch();

  const { AiEngineSettings, result } = useSelector((state) => ({
    AiEngineSettings: state.AiEngineSettings.settings,
    result: state.AiEngineSettings.result,
  }));

  const [settingsList, setSettingsList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize: AiEngineSettings?.length, // replace later with size(AiEngineSettings),
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

  const aiEngineColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      formatter: (cellContent, Settings) => <>{Settings.id}</>,
    },
    {
      text: "Email Setting Name",
      dataField: "setting_key",
      sort: true,
    },
    {
      text: "Description",
      dataField: "setting_value",
      sort: true,
      style: { width: "35%" },
    },
    {
      text: "No Of Days",
      dataField: "number_of_days",
      sort: true,
    },
    {
      text: "Alert On/Off",
      dataField: "is_active",
      sort: true,
      formatter: (cellContent, Settings) => (
        <>
          <span
            className={`badge ${
              Settings?.is_active === true
                ? "badge-soft-success"
                : "badge-soft-danger"
            } font-size-10 mx-1`}
          >
            {Settings?.is_active === true ? "ON" : "OFF"}
          </span>
        </>
      ),
    },
    {
      dataField: "menu",
      isDummyField: false,
      editable: false,
      text: "Action",
      formatter: (cellContent, Settings) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleSettingClick(Settings)}
            ></i>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (AiEngineSettings && !AiEngineSettings.length) {
      dispatch(onGetSettings());
      setIsEdit(false);
    }
  }, []);

  useEffect(() => {
    setSettingsList(AiEngineSettings);
    setIsEdit(false);
  }, [AiEngineSettings]);

  const toggle = () => {
    setModal(!modal);
    if (!modal && !isEmpty(AiEngineSettings) && !!isEdit) {
      setTimeout(() => {
        setSettingsList(AiEngineSettings);
        setIsEdit(false);
      }, 500);
    }
  };

  const handleSettingClick = (arg) => {
    const AiEngineSettings = arg;
    setSettingsList({
      settingsId: AiEngineSettings.setting_identifier,
      settingsKey: AiEngineSettings.setting_key,
      settingsValue: AiEngineSettings.setting_value,
      companyid: AiEngineSettings.company_identifier,
      active: AiEngineSettings.is_active,
      days: AiEngineSettings.number_of_days,
    });
    setIsEdit(true);
    toggle();
  };

  /**
   * Handling submit AiEngineSettings on AiEngineSettings form
   */
  // useEffect(() => {
  //   // eslint-disable-next-line array-callback-return
  //   fields.map((field) => {
  //     const newsettings = {
  //       company_identifier: "6C0276EC-FEA1-4FA8-BB1F-5D428A850222", //JSON.parse(localStorage.getItem("authUser")).companyID,
  //       setting_key: field.title,
  //       setting_value: field.description,
  //       is_active: true,
  //       number_of_days: 10,
  //     };
  //     dispatch(onAddNewSetting(newsettings));
  //   });
  // }, []);

  const handleValidAssetSubmit = (e, values) => {
    if (isEdit) {
      const updateSettings = {
        company_identifier: "6C0276EC-FEA1-4FA8-BB1F-5D428A850222", //JSON.parse(localStorage.getItem("authUser")).companyID,
        setting_identifier: settingsList?.settingsId,
        setting_key: values["settingkey"],
        setting_value: values["settingdesc"],
        number_of_days: values["days"],
      };
      // update AiEngineSettings
      dispatch(onUpdateSetting(updateSettings));
      setIsEdit(false);
    } else {
      setIsLoading(true);
      const newsettings = {
        company_identifier: "6C0276EC-FEA1-4FA8-BB1F-5D428A850222", //JSON.parse(localStorage.getItem("authUser")).companyID,
        setting_key: values["settingkey"],
        setting_value: values["settingdesc"],
        is_active: true,
        number_of_days: values["days"],
      };
      // save new AiEngineSettings
      dispatch(onAddNewSetting(newsettings));
    }
    toggle();
  };

  const handleSettingsClicks = () => {
    setSettingsList("");
    setIsEdit(false);
    toggle();
  };

  if (result === "Settings Saved Successfully") {
    toast(`${result} !`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      toastId: "00097",
    });
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Email Settings | Crossleaf - Access Management</title>
        </MetaTags>

        <Container fluid>
          <ToastContainer />
          <Row>
            <Col lg={12} className="mb-2">
              <h5>Email Settings List</h5>
            </Col>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={aiEngineColumns}
                    data={AiEngineSettings}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={AiEngineSettings}
                        columns={aiEngineColumns}
                        search
                      >
                        {(toolkitProps) => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <div className="row align-ite  ms-center">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <h5 className="card-title">
                                      Current Settings{" "}
                                      <span className="text-muted fw-normal ms-2">
                                        ({AiEngineSettings.length})
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
                                        onClick={handleSettingsClicks}
                                      >
                                        <i className="bx bx-plus me-1"></i> Add
                                        Settings
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
                                    responsive={true}
                                    bordered={false}
                                    striped={false}
                                    defaultSorted={defaultSorted}
                                    selectRow={selectRow}
                                    TableChangeType={"filter"}
                                    classes={"table"}
                                    headerWrapperClasses={"thead-dark"}
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                    columnFilter={true}
                                    bootstrap4={true}
                                  />

                                  <Modal
                                    isOpen={modal}
                                    toggle={toggle}
                                    size="xl"
                                    scrollable={true}
                                  >
                                    <ModalHeader toggle={toggle} tag="h4">
                                      {!!isEdit
                                        ? "Edit Settings"
                                        : "Add Settings"}
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
                                                    name="settingkey"
                                                    label="Email Setting Name"
                                                    placeholder="Email Setting Name"
                                                    type="text"
                                                    maxLength={50}
                                                    errorMessage="please provide valid Setting name"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      settingsList?.settingsKey ||
                                                      ""
                                                    }
                                                  />
                                                </div>
                                              </Col>
                                              <Col xs={6}>
                                                <div className="mb-3">
                                                  <AvField
                                                    name="settingdesc"
                                                    label="Setting Decsription"
                                                    placeholder="setting description"
                                                    type="text"
                                                    errorMessage="please provide valid setting description"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      settingsList?.settingsValue ||
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
                                                    name="days"
                                                    label="Number of Days"
                                                    placeholder="number of days"
                                                    type="number"
                                                    errorMessage="please provide valid days"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    value={
                                                      settingsList?.days || ""
                                                    }
                                                  />
                                                </div>
                                              </Col>
                                            </Row>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col>
                                            <div className="text-end">
                                              <button
                                                type="submit"
                                                className="btn btn-success save-AiEngineSettings"
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
