import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_COMPGROUPS,
  ADD_NEW_COMPGROUP,
  DELETE_COMPGROUP,
  UPDATE_COMPGROUP,
} from "./actionTypes";

import {
  getCompGroupsSuccess,
  getCompGroupsFail,
  addCompGroupFail,
  addCompGroupSuccess,
  updateCompGroupSuccess,
  updateCompGroupFail,
  deleteCompGroupSuccess,
  deleteCompGroupFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getCompGroups,
  addNewCompGroup,
  updateCompGroup,
  deleteCompGroup,
} from "../../helpers/fakebackend_helper";

//CompGroupsManagement

function* fetchCompGroups() {
  try {
    const response = yield call(getCompGroups);
    yield put(getCompGroupsSuccess(response));
  } catch (error) {
    yield put(getCompGroupsFail(error));
  }
}

function* onUpdateCompGroup({ payload: group }) {
  try {
    const response = yield call(updateCompGroup, group);

    yield put(updateCompGroupSuccess(response));
  } catch (error) {
    yield put(updateCompGroupFail(error));
  }
}

function* onDeleteCompGroup({ payload: group }) {
  try {
    yield call(deleteCompGroup, group);
    const res = yield put(deleteCompGroupSuccess(group));
  } catch (error) {
    yield put(deleteCompGroupFail(error));
  }
}

function* onAddNewCompGroup({ payload: group }) {
  try {
    const response = yield call(addNewCompGroup, group);
    yield put(addCompGroupSuccess(response));
  } catch (error) {
    yield put(addCompGroupFail(error));
  }
}

function* compGroupsSaga() {
  yield takeEvery(GET_COMPGROUPS, fetchCompGroups);
  yield takeEvery(ADD_NEW_COMPGROUP, onAddNewCompGroup);
  yield takeEvery(UPDATE_COMPGROUP, onUpdateCompGroup);
  yield takeEvery(DELETE_COMPGROUP, onDeleteCompGroup);
}

export default compGroupsSaga;
