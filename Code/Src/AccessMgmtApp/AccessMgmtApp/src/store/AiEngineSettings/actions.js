import {
  GET_AIENGINE_SETTINGS,
  GET_AIENGINE_SETTINGS_FAIL,
  GET_AIENGINE_SETTINGS_SUCCESS,
  ADD_NEW_AIENGINE_SETTING,
  ADD_AIENGINE_SETTING_SUCCESS,
  ADD_AIENGINE_SETTING_FAIL,
  UPDATE_AIENGINE_SETTING,
  UPDATE_AIENGINE_SETTING_SUCCESS,
  UPDATE_AIENGINE_SETTING_FAIL,
  DELETE_AIENGINE_SETTING,
  DELETE_AIENGINE_SETTING_SUCCESS,
  DELETE_AIENGINE_SETTING_FAIL,
} from "./actionTypes";

//AiEngineSettings

export const getAiEngineSettings = () => ({
  type: GET_AIENGINE_SETTINGS,
});

export const getAiEngineSettingsSuccess = (settings) => ({
  type: GET_AIENGINE_SETTINGS_SUCCESS,
  payload: settings,
});

export const addNewAiEngineSetting = (setting) => ({
  type: ADD_NEW_AIENGINE_SETTING,
  payload: setting,
});

export const addAiEngineSettingSuccess = (setting) => ({
  type: ADD_AIENGINE_SETTING_SUCCESS,
  payload: setting,
});

export const addAiEngineSettingFail = (error) => ({
  type: ADD_AIENGINE_SETTING_FAIL,
  payload: error,
});

export const getAiEngineSettingsFail = (error) => ({
  type: GET_AIENGINE_SETTINGS_FAIL,
  payload: error,
});

export const updateAiEngineSetting = (asset) => ({
  type: UPDATE_AIENGINE_SETTING,
  payload: asset,
});

export const updateAiEngineSettingSuccess = (setting) => ({
  type: UPDATE_AIENGINE_SETTING_SUCCESS,
  payload: setting,
});

export const updateAiEngineSettingFail = (error) => ({
  type: UPDATE_AIENGINE_SETTING_FAIL,
  payload: error,
});

export const deleteAiEngineSetting = (setting) => ({
  type: DELETE_AIENGINE_SETTING,
  payload: setting,
});

export const deleteAiEngineSettingSuccess = (setting) => ({
  type: DELETE_AIENGINE_SETTING_SUCCESS,
  payload: setting,
});

export const deleteAiEngineSettingFail = (error) => ({
  type: DELETE_AIENGINE_SETTING_FAIL,
  payload: error,
});
