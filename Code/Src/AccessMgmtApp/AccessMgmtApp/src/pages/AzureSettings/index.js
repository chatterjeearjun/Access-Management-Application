import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Col, Row, Container, Card, CardHeader } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {
  getCompanySettings as onGetCompanySettings,
  addNewCompanySetting as onAddNewCompanySettings,
  updateCompanySetting as onUpdateCompanySettings,
} from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AzureSettings = () => {
  const dispatch = useDispatch();

  const { settings, result } = useSelector((state) => ({
    settings: state.companySettings.settings,
    result: state.companySettings.result,
  }));
  const [settingsList, setSettingsList] = useState([]);

  useEffect(() => {
    if (settings && !settings.length) {
      dispatch(onGetCompanySettings());
    }
  }, []);

  useEffect(() => {
    debugger;
    settings.filter((setting) => setting.setting_key === "AzureSettings");
    setSettingsList(
      settings.filter((setting) => setting.setting_key === "AzureSettings")
    );
  }, [settings]);

  const handleValidSettingSubmit = (e, values) => {
    if (settingsList[0]?.setting_value) {
      const updateAzureSetting1 = {
        company_identifier: "6C0276EC-FEA1-4FA8-BB1F-5D428A850222", //JSON.parse(localStorage.getItem("authUser")).companyID,
        setting_identifier: settingsList[0]?.setting_identifier,
        setting_key: "AzureSettings",
        setting_value: values["tenantid"],
      };
      const updateAzureSetting2 = {
        company_identifier: "6C0276EC-FEA1-4FA8-BB1F-5D428A850222", //JSON.parse(localStorage.getItem("authUser")).companyID,
        setting_identifier: settingsList[1]?.setting_identifier,
        setting_key: "AzureSettings",
        setting_value: values["appid"],
      };
      const updateAzureSetting3 = {
        company_identifier: "6C0276EC-FEA1-4FA8-BB1F-5D428A850222", //JSON.parse(localStorage.getItem("authUser")).companyID,
        setting_identifier: settingsList[2]?.setting_identifier,
        setting_key: "AzureSettings",
        setting_value: values["securitykey"],
      };
      dispatch(onUpdateCompanySettings(updateAzureSetting1));
      dispatch(onUpdateCompanySettings(updateAzureSetting2));
      dispatch(onUpdateCompanySettings(updateAzureSetting3));
    } else {
      const newAzureSetting1 = {
        company_identifier: "6C0276EC-FEA1-4FA8-BB1F-5D428A850222", //JSON.parse(localStorage.getItem("authUser")).companyID,
        setting_key: "AzureSettings",
        setting_value: values["tenantid"],
        is_active: true,
      };
      const newAzureSetting2 = {
        company_identifier: "6C0276EC-FEA1-4FA8-BB1F-5D428A850222", //JSON.parse(localStorage.getItem("authUser")).companyID,
        setting_key: "AzureSettings",
        setting_value: values["appid"],
        is_active: true,
      };
      const newAzureSetting3 = {
        company_identifier: "6C0276EC-FEA1-4FA8-BB1F-5D428A850222", //JSON.parse(localStorage.getItem("authUser")).companyID,
        setting_key: "AzureSettings",
        setting_value: values["securitykey"],
        is_active: true,
      };
      dispatch(onAddNewCompanySettings(newAzureSetting1));
      dispatch(onAddNewCompanySettings(newAzureSetting2));
      dispatch(onAddNewCompanySettings(newAzureSetting3));
    }
  };

  //Toasts
  if (result !== "") {
    toast(result, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      toastId: "0999",
    });
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Azure Settings | Crossleaf - Access Management</title>
        </MetaTags>
        <ToastContainer />
        <Container fluid>
          <Card>
            <CardHeader>
              <h5 className="font-size-14">
                <i className="mdi mdi-arrow-right text-primary me-1"></i> Azure
                Settings
              </h5>
            </CardHeader>
            <Row className="mx-2 my-3">
              <Col>
                <div>
                  <AvForm onValidSubmit={handleValidSettingSubmit}>
                    <Row>
                      <Col xs={3}>
                        <div className="mb-3">
                          <AvField
                            type="text"
                            className="form-control"
                            placeholder="Enter azure tenant id"
                            name="tenantid"
                            required
                            errormessage="Enter valid azure tenant id"
                            label="Azure Tenant Id"
                            value={settingsList[0]?.setting_value || ""}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={3}>
                        <div className="mb-3">
                          <AvField
                            type="text"
                            className="form-control"
                            placeholder="Enter app id"
                            name="appid"
                            required
                            errormessage="Enter valid app id"
                            label="App Id"
                            value={settingsList[1]?.setting_value || ""}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={3}>
                        <div className="mb-3">
                          <AvField
                            type="text"
                            className="form-control"
                            placeholder="Enter security key"
                            name="securitykey"
                            required
                            errormessage="Enter valid security key"
                            label="Security Key"
                            value={settingsList[2]?.setting_value || ""}
                          />
                        </div>
                      </Col>
                    </Row>
                    <div className="mt-4">
                      <button type="submit" className="btn btn-primary w-md">
                        Save
                      </button>
                    </div>
                  </AvForm>
                </div>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AzureSettings;
