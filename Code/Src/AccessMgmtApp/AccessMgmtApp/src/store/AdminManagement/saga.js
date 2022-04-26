import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_APPROVERS,
  GET_APPROVER_PROFILE,
  ADD_NEW_APPROVER,
  DELETE_APPROVER,
  UPDATE_APPROVER,
} from "./actionTypes";

import {
  getApproversSuccess,
  getApproversFail,
  getApproverProfileSuccess,
  getApproverProfileFail,
  addApproverFail,
  addApproverSuccess,
  updateApproverSuccess,
  updateApproverFail,
  deleteApproverSuccess,
  deleteApproverFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getApprovers,
  getApproverProfile,
  addNewApprover,
  updateApprover,
  deleteApprover,
} from "../../helpers/fakebackend_helper";

//APPROVERS CRUD OPERATIONS

function* fetchApprovers() {
  try {
    const response = yield call(getApprovers);
    yield put(getApproversSuccess(response));
  } catch (error) {
    yield put(getApproversFail(error));
  }
}

function* fetchApproverProfile() {
  try {
    const response = yield call(getApproverProfile);
    yield put(getApproverProfileSuccess(response));
  } catch (error) {
    yield put(getApproverProfileFail(error));
  }
}

function* onUpdateApprover({ payload: approver }) {
  try {
    const response = yield call(updateApprover, approver);

    yield put(updateApproverSuccess(response));
  } catch (error) {
    yield put(updateApproverFail(error));
  }
}

function* onDeleteApprover({ payload: user }) {
  try {
    yield call(deleteApprover, user);
    yield put(deleteApproverSuccess(user));
  } catch (error) {
    yield put(deleteApproverFail(error));
  }
}

function* onAddNewApprover({ payload: user }) {
  try {
    const response = yield call(addNewApprover, user);
    yield put(addApproverSuccess(response));
  } catch (error) {
    yield put(addApproverFail(error));
  }
}
function* adminteamSaga() {
  yield takeEvery(GET_APPROVERS, fetchApprovers);
  yield takeEvery(GET_APPROVER_PROFILE, fetchApproverProfile);
  yield takeEvery(ADD_NEW_APPROVER, onAddNewApprover);
  yield takeEvery(UPDATE_APPROVER, onUpdateApprover);
  yield takeEvery(DELETE_APPROVER, onDeleteApprover);
}

export default adminteamSaga;
