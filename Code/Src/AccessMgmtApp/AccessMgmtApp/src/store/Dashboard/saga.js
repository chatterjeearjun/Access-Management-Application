import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { GET_DASHBOARD_DATA } from "./actionTypes";

import { getDashboardDataSuccess, getDashboardDataFail } from "./actions";

//Include Both Helper File with needed methods
import { getDashboardData } from "../../helpers/fakebackend_helper";

//DashboardDataManagement

function* fetchDashboardData({ payload: dates }) {
  try {
    const response = yield call(getDashboardData, dates);
    yield put(getDashboardDataSuccess(response));
  } catch (error) {
    yield put(getDashboardDataFail(error));
  }
}
function* dashboardSaga() {
  yield takeEvery(GET_DASHBOARD_DATA, fetchDashboardData);
}

export default dashboardSaga;
