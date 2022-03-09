import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_USERS,
  GET_GROUPS,
  GET_USER_PROFILE,
  ADD_NEW_USER,
  DELETE_USER,
  UPDATE_USER,
  GET_APPROVERS,
  GET_APPROVER_PROFILE,
  ADD_NEW_APPROVER,
  DELETE_APPROVER,
  UPDATE_APPROVER,
  GET_ASSETS,
  ADD_NEW_ASSET,
  DELETE_ASSET,
  UPDATE_ASSET,
} from "./actionTypes";

import {
  getUsersSuccess,
  getGroupsSuccess,
  getGroupsFail,
  getUsersFail,
  getUserProfileSuccess,
  getUserProfileFail,
  addUserFail,
  addUserSuccess,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail,
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
  getAssetsSuccess,
  getAssetsFail,
  getAssetProfileFail,
  addAssetFail,
  addAssetSuccess,
  updateAssetSuccess,
  updateAssetFail,
  deleteAssetSuccess,
  deleteAssetFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getUsers,
  getEmployeeGroups,
  getUserProfile,
  addNewUser,
  updateUser,
  deleteUser,
  getApprovers,
  getApproverProfile,
  addNewApprover,
  updateApprover,
  deleteApprover,
  getAssets,
  addNewAsset,
  updateAsset,
  deleteAsset,
} from "../../helpers/fakebackend_helper";

function* fetchUsers() {
  try {
    const response = yield call(getUsers);
    yield put(getUsersSuccess(response));
  } catch (error) {
    yield put(getUsersFail(error));
  }
}
function* fetchGroups() {
  try {
    const response = yield call(getEmployeeGroups);
    yield put(getGroupsSuccess(response));
  } catch (error) {
    yield put(getGroupsFail(error));
  }
}

function* fetchUserProfile() {
  try {
    const response = yield call(getUserProfile);
    yield put(getUserProfileSuccess(response));
  } catch (error) {
    yield put(getUserProfileFail(error));
  }
}

function* onUpdateUser({ payload: user }) {
  try {
    const response = yield call(updateUser, user);
    debugger;
    yield put(updateUserSuccess(response));
  } catch (error) {
    yield put(updateUserFail(error));
  }
}

function* onDeleteUser({ payload: user }) {
  try {
    yield call(deleteUser, user.id);
    yield put(deleteUserSuccess(user));
  } catch (error) {
    yield put(deleteUserFail(error));
  }
}

function* onAddNewUser({ payload: user }) {
  try {
    const response = yield call(addNewUser, user);
    yield put(addUserSuccess(response));
  } catch (error) {
    yield put(addUserFail(error));
  }
}

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
    debugger;
    yield put(updateApproverSuccess(response));
  } catch (error) {
    yield put(updateApproverFail(error));
  }
}

function* onDeleteApprover({ payload: user }) {
  try {
    yield call(deleteApprover, user.id);
    const res = yield put(deleteApproverSuccess(user));
    console.log(res, "result........");
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

//AssetsManagement

function* fetchAssets() {
  try {
    const response = yield call(getAssets);
    yield put(getAssetsSuccess(response));
  } catch (error) {
    yield put(getAssetsFail(error));
  }
}

function* onUpdateAsset({ payload: asset }) {
  try {
    const response = yield call(updateAsset, asset);
    debugger;
    yield put(updateAssetSuccess(response));
  } catch (error) {
    yield put(updateAssetFail(error));
  }
}

function* onDeleteAsset({ payload: user }) {
  try {
    yield call(deleteAsset, user.id);
    const res = yield put(deleteAssetSuccess(user));
    console.log(res, "result........");
  } catch (error) {
    yield put(deleteAssetFail(error));
  }
}

function* onAddNewAsset({ payload: user }) {
  try {
    const response = yield call(addNewAsset, user);
    yield put(addAssetSuccess(response));
  } catch (error) {
    yield put(addAssetFail(error));
  }
}

function* contactsSaga() {
  yield takeEvery(GET_USERS, fetchUsers);
  yield takeEvery(GET_GROUPS, fetchGroups);
  yield takeEvery(GET_USER_PROFILE, fetchUserProfile);
  yield takeEvery(ADD_NEW_USER, onAddNewUser);
  yield takeEvery(UPDATE_USER, onUpdateUser);
  yield takeEvery(DELETE_USER, onDeleteUser);
  yield takeEvery(GET_APPROVERS, fetchApprovers);
  yield takeEvery(GET_APPROVER_PROFILE, fetchApproverProfile);
  yield takeEvery(ADD_NEW_APPROVER, onAddNewApprover);
  yield takeEvery(UPDATE_APPROVER, onUpdateApprover);
  yield takeEvery(DELETE_APPROVER, onDeleteApprover);
  yield takeEvery(GET_ASSETS, fetchAssets);
  yield takeEvery(ADD_NEW_ASSET, onAddNewAsset);
  yield takeEvery(UPDATE_ASSET, onUpdateAsset);
  yield takeEvery(DELETE_ASSET, onDeleteAsset);
}

export default contactsSaga;
