import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Col, Row, Container, Card, CardHeader } from "reactstrap";
import { AvForm, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import {
  getCompanySettings as onGetCompanySettings,
  addNewCompanySetting as onAddNewCompanySettings,
  updateCompanySetting as onUpdateCompanySettings,
} from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadSettings = () => {
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
    setSettingsList(
      settings.filter((setting) => setting.setting_key === "UploadSettings")
    );
  }, [settings]);

  const handleValidSettingSubmit = (e, values) => {
    debugger;
    if (settingsList[0]?.setting_value) {
      const updateUploadSettings = {
        company_identifier: "6C0276EC-FEA1-4FA8-BB1F-5D428A850222", //JSON.parse(localStorage.getItem("authUser")).companyID,
        setting_identifier: settingsList[0]?.setting_identifier,
        setting_key: "UploadSettings",
        setting_value: values["uploadsettings"],
      };

      dispatch(onUpdateCompanySettings(updateUploadSettings));
    } else {
      debugger;
      const newUploadSettings = {
        company_identifier: "6C0276EC-FEA1-4FA8-BB1F-5D428A850222", //JSON.parse(localStorage.getItem("authUser")).companyID,
        setting_key: "UploadSettings",
        setting_value: values["uploadsettings"],
        is_active: true,
      };

      dispatch(onAddNewCompanySettings(newUploadSettings));
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
                      <Col>
                        <AvRadioGroup
                          inline
                          name="uploadsettings"
                          label="Choose how to provide documents?"
                          required
                          value={setSettingsList[0]?.setting_value}
                        >
                          <AvRadio
                            label="Upload File"
                            value="uploadfile"
                            check={true}
                          />
                          <AvRadio
                            label="Url of you file"
                            value="urlinput"
                            check={
                              setSettingsList[0]?.setting_value === "urlinput"
                            }
                          />
                          <AvRadio
                            label="Already with Company"
                            value="alreadyuploaded"
                            checked={
                              setSettingsList[0]?.setting_value ===
                              "alreadyuploaded"
                            }
                          />
                        </AvRadioGroup>
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

export default UploadSettings;
