import {
  GET_COMPANY_SETTINGS,
  GET_COMPANY_SETTINGS_FAIL,
  GET_COMPANY_SETTINGS_SUCCESS,
  ADD_NEW_COMPANY_SETTING,
  ADD_COMPANY_SETTING_SUCCESS,
  ADD_COMPANY_SETTING_FAIL,
  UPDATE_COMPANY_SETTING,
  UPDATE_COMPANY_SETTING_SUCCESS,
  UPDATE_COMPANY_SETTING_FAIL,
  DELETE_COMPANY_SETTING,
  DELETE_COMPANY_SETTING_SUCCESS,
  DELETE_COMPANY_SETTING_FAIL,
} from "./actionTypes";

//CompanySettings

export const getCompanySettings = () => ({
  type: GET_COMPANY_SETTINGS,
});

export const getCompanySettingsSuccess = (settings) => ({
  type: GET_COMPANY_SETTINGS_SUCCESS,
  payload: settings,
});

export const addNewCompanySetting = (setting) => ({
  type: ADD_NEW_COMPANY_SETTING,
  payload: setting,
});

export const addCompanySettingSuccess = (setting) => ({
  type: ADD_COMPANY_SETTING_SUCCESS,
  payload: setting,
});

export const addCompanySettingFail = (error) => ({
  type: ADD_COMPANY_SETTING_FAIL,
  payload: error,
});

export const getCompanySettingsFail = (error) => ({
  type: GET_COMPANY_SETTINGS_FAIL,
  payload: error,
});

export const updateCompanySetting = (asset) => ({
  type: UPDATE_COMPANY_SETTING,
  payload: asset,
});

export const updateCompanySettingSuccess = (setting) => ({
  type: UPDATE_COMPANY_SETTING_SUCCESS,
  payload: setting,
});

export const updateCompanySettingFail = (error) => ({
  type: UPDATE_COMPANY_SETTING_FAIL,
  payload: error,
});

export const deleteCompanySetting = (setting) => ({
  type: DELETE_COMPANY_SETTING,
  payload: setting,
});

export const deleteCompanySettingSuccess = (setting) => ({
  type: DELETE_COMPANY_SETTING_SUCCESS,
  payload: setting,
});

export const deleteCompanySettingFail = (error) => ({
  type: DELETE_COMPANY_SETTING_FAIL,
  payload: error,
});
