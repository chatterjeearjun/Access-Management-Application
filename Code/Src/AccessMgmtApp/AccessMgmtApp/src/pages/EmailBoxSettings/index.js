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

const EmailBoxSettings = () => {
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
    settings.filter((setting) => setting.setting_key === "EmailBoxSettings");
    setSettingsList(
      settings.filter((setting) => setting.setting_key === "EmailBoxSettings")
    );
  }, [settings]);

  const handleValidSettingSubmit = (e, values) => {
    if (settingsList[0]?.setting_value) {
      const updateCompanySetting = {
        company_identifier: "6C0276EC-FEA1-4FA8-BB1F-5D428A850222", //JSON.parse(localStorage.getItem("authUser")).companyID,
        setting_identifier: settingsList[0]?.setting_identifier,
        setting_key: "EmailBoxSettings",
        setting_value: values["email"],
      };
      dispatch(onUpdateCompanySettings(updateCompanySetting));
    } else {
      const newCompanySetting = {
        company_identifier: "6C0276EC-FEA1-4FA8-BB1F-5D428A850222", //JSON.parse(localStorage.getItem("authUser")).companyID,
        setting_key: "EmailBoxSettings",
        setting_value: values["email"],
        is_active: true,
      };
      dispatch(onAddNewCompanySettings(newCompanySetting));
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
          <title>Email Box Settings | Crossleaf - Access Management</title>
        </MetaTags>
        <ToastContainer />
        <Container fluid>
          <Card>
            <CardHeader>
              <h5 className="font-size-14">
                <i className="mdi mdi-arrow-right text-primary me-1"></i> Email
                Box Settings
              </h5>
            </CardHeader>
            <Row className="mx-2 my-3">
              <Col lg={3}>
                <div>
                  <AvForm onValidSubmit={handleValidSettingSubmit}>
                    <Row form>
                      <Col>
                        <div className="mb-3">
                          <AvField
                            name="email"
                            type="email"
                            className="form-control"
                            id="formrow-email-input"
                            placeholder="Enter email"
                            label="Email"
                            errormessage="please provide valid email"
                            validate={{
                              required: { value: true },
                            }}
                            value={settingsList[0]?.setting_value || ""}
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

export default EmailBoxSettings;
