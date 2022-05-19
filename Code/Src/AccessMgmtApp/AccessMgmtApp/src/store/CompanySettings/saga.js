import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_COMPANY_SETTINGS,
  ADD_NEW_COMPANY_SETTING,
  DELETE_COMPANY_SETTING,
  UPDATE_COMPANY_SETTING,
} from "./actionTypes";

import {
  getCompanySettingsSuccess,
  getCompanySettingsFail,
  addCompanySettingFail,
  addCompanySettingSuccess,
  updateCompanySettingSuccess,
  updateCompanySettingFail,
  deleteCompanySettingSuccess,
  deleteCompanySettingFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getCompanySettings,
  addNewCompanySetting,
  updateCompanySetting,
  deleteCompanySetting,
} from "../../helpers/fakebackend_helper";

//CompanySettingsManagement

function* fetchCompanySettings() {
  try {
    const response = yield call(getCompanySettings);
    yield put(getCompanySettingsSuccess(response));
  } catch (error) {
    yield put(getCompanySettingsFail(error));
  }
}

function* onUpdateCompanySetting({ payload: setting }) {
  try {
    const response = yield call(updateCompanySetting, setting);

    yield put(updateCompanySettingSuccess(response));
  } catch (error) {
    yield put(updateCompanySettingFail(error));
  }
}

function* onDeleteCompanySetting({ payload: setting }) {
  try {
    yield call(deleteCompanySetting, setting);
    yield put(deleteCompanySettingSuccess(setting));
  } catch (error) {
    yield put(deleteCompanySettingFail(error));
  }
}

function* onAddNewCompanySetting({ payload: setting }) {
  try {
    const response = yield call(addNewCompanySetting, setting);
    yield put(addCompanySettingSuccess(response));
  } catch (error) {
    yield put(addCompanySettingFail(error));
  }
}

function* companySettingsSaga() {
  yield takeEvery(GET_COMPANY_SETTINGS, fetchCompanySettings);
  yield takeEvery(ADD_NEW_COMPANY_SETTING, onAddNewCompanySetting);
  yield takeEvery(UPDATE_COMPANY_SETTING, onUpdateCompanySetting);
  yield takeEvery(DELETE_COMPANY_SETTING, onDeleteCompanySetting);
}

export default companySettingsSaga;
