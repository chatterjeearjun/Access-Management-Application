import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { GET_EMPLOYEE_PROFILE } from "./actionsTypes";

import { getEmployeeProfileSuccess, getEmployeeProfileFail } from "./actions";

//Include Both Helper File with needed methods
import { getEmployeeProfile } from "../../helpers/fakebackend_helper";

function* fetchEmployeeProfile({ payload: id }) {
  try {
    const response = yield call(getEmployeeProfile, id);
    yield put(getEmployeeProfileSuccess(response));
  } catch (error) {
    yield put(getEmployeeProfileFail(error));
  }
}

function* employeeProfileSaga() {
  yield takeEvery(GET_EMPLOYEE_PROFILE, fetchEmployeeProfile);
}

export default employeeProfileSaga;
