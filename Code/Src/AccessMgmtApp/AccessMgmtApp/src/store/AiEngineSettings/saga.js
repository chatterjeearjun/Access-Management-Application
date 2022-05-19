import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_AIENGINE_SETTINGS,
  ADD_NEW_AIENGINE_SETTING,
  DELETE_AIENGINE_SETTING,
  UPDATE_AIENGINE_SETTING,
} from "./actionTypes";

import {
  getAiEngineSettingsSuccess,
  getAiEngineSettingsFail,
  addAiEngineSettingFail,
  addAiEngineSettingSuccess,
  updateAiEngineSettingSuccess,
  updateAiEngineSettingFail,
  deleteAiEngineSettingSuccess,
  deleteAiEngineSettingFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getAiEngineSettings,
  addNewAiEngineSetting,
  updateAiEngineSetting,
  deleteAiEngineSetting,
} from "../../helpers/fakebackend_helper";

//AiEngineSettingsManagement

function* fetchAiEngineSettings() {
  try {
    const response = yield call(getAiEngineSettings);
    yield put(getAiEngineSettingsSuccess(response));
  } catch (error) {
    yield put(getAiEngineSettingsFail(error));
  }
}

function* onUpdateAiEngineSetting({ payload: setting }) {
  try {
    const response = yield call(updateAiEngineSetting, setting);

    yield put(updateAiEngineSettingSuccess(response));
  } catch (error) {
    yield put(updateAiEngineSettingFail(error));
  }
}

function* onDeleteAiEngineSetting({ payload: setting }) {
  try {
    yield call(deleteAiEngineSetting, setting);
    yield put(deleteAiEngineSettingSuccess(setting));
  } catch (error) {
    yield put(deleteAiEngineSettingFail(error));
  }
}

function* onAddNewAiEngineSetting({ payload: setting }) {
  try {
    const response = yield call(addNewAiEngineSetting, setting);
    yield put(addAiEngineSettingSuccess(response));
  } catch (error) {
    yield put(addAiEngineSettingFail(error));
  }
}

function* AiEngineSettingsSaga() {
  yield takeEvery(GET_AIENGINE_SETTINGS, fetchAiEngineSettings);
  yield takeEvery(ADD_NEW_AIENGINE_SETTING, onAddNewAiEngineSetting);
  yield takeEvery(UPDATE_AIENGINE_SETTING, onUpdateAiEngineSetting);
  yield takeEvery(DELETE_AIENGINE_SETTING, onDeleteAiEngineSetting);
}

export default AiEngineSettingsSaga;
