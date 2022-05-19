import {
  GET_COMPANY_SETTINGS_SUCCESS,
  GET_COMPANY_SETTINGS_FAIL,
  ADD_COMPANY_SETTING_SUCCESS,
  ADD_COMPANY_SETTING_FAIL,
  UPDATE_COMPANY_SETTING_SUCCESS,
  UPDATE_COMPANY_SETTING_FAIL,
  DELETE_COMPANY_SETTING_SUCCESS,
  DELETE_COMPANY_SETTING_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  error: {},
  result: "",
  settings: [],
};

const companySettings = (state = INIT_STATE, action) => {
  switch (action.type) {
    //RolesManagement

    case GET_COMPANY_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: action.payload,
        result: "",
      };

    case GET_COMPANY_SETTINGS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_COMPANY_SETTING_SUCCESS:
      return {
        ...state,
        settings: [...state.settings, action.payload],
        result: "Settings Saved Successfully",
      };

    case ADD_COMPANY_SETTING_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_COMPANY_SETTING_SUCCESS:
      return {
        ...state,
        settings: state.settings.map((setting) =>
          setting.setting_identifier.toString() ===
          action.payload.setting_identifier.toString()
            ? { setting, ...action.payload }
            : setting
        ),
        result: "Settings Updated Successfully",
      };

    case UPDATE_COMPANY_SETTING_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_COMPANY_SETTING_SUCCESS:
      return {
        ...state,
        settings: state.settings.filter(
          (setting) => setting.id.toString() !== action.payload.id.toString()
        ),
        result: "success",
      };

    case DELETE_COMPANY_SETTING_FAIL:
      return {
        ...state,
        error: action.payload,
        result: "success",
      };

    default:
      return state;
  }
};

export default companySettings;
