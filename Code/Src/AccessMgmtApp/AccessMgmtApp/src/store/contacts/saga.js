import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_USERS,
  GET_USER_PROFILE,
  ADD_NEW_USER,
  DELETE_USER,
  UPDATE_USER,
  GET_APPROVERS,
  GET_APPROVER_PROFILE,
  ADD_NEW_APPROVER,
  DELETE_APPROVER,
  UPDATE_APPROVER,
  GET_ROLES,
  ADD_NEW_ROLE,
  DELETE_ROLE,
  UPDATE_ROLE,
} from "./actionTypes";

import {
  getUsersSuccess,
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
  getRolesSuccess,
  getRolesFail,
  addRoleFail,
  addRoleSuccess,
  updateRoleSuccess,
  updateRoleFail,
  deleteRoleSuccess,
  deleteRoleFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getUsers,
  getUserProfile,
  addNewUser,
  updateUser,
  deleteUser,
  getApprovers,
  getApproverProfile,
  addNewApprover,
  updateApprover,
  deleteApprover,
  getRoles,
  addNewRole,
  updateRole,
  deleteRole,
} from "../../helpers/fakebackend_helper";

function* fetchUsers() {
  try {
    const response = yield call(getUsers);
    yield put(getUsersSuccess(response));
  } catch (error) {
    yield put(getUsersFail(error));
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
    yield call(deleteUser, user);
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

//RolesManagement

function* fetchRoles() {
  try {
    const response = yield call(getRoles);
    yield put(getRolesSuccess(response));
  } catch (error) {
    yield put(getRolesFail(error));
  }
}

function* onUpdateRole({ payload: asset }) {
  try {
    const response = yield call(updateRole, asset);
    debugger;
    yield put(updateRoleSuccess(response));
  } catch (error) {
    yield put(updateRoleFail(error));
  }
}

function* onDeleteRole({ payload: user }) {
  try {
    yield call(deleteRole, user);
    const res = yield put(deleteRoleSuccess(user));
    console.log(res, "result........");
  } catch (error) {
    yield put(deleteRoleFail(error));
  }
}

function* onAddNewRole({ payload: user }) {
  try {
    const response = yield call(addNewRole, user);
    yield put(addRoleSuccess(response));
  } catch (error) {
    yield put(addRoleFail(error));
  }
}

function* contactsSaga() {
  yield takeEvery(GET_USERS, fetchUsers);
  yield takeEvery(GET_USER_PROFILE, fetchUserProfile);
  yield takeEvery(ADD_NEW_USER, onAddNewUser);
  yield takeEvery(UPDATE_USER, onUpdateUser);
  yield takeEvery(DELETE_USER, onDeleteUser);
  yield takeEvery(GET_APPROVERS, fetchApprovers);
  yield takeEvery(GET_APPROVER_PROFILE, fetchApproverProfile);
  yield takeEvery(ADD_NEW_APPROVER, onAddNewApprover);
  yield takeEvery(UPDATE_APPROVER, onUpdateApprover);
  yield takeEvery(DELETE_APPROVER, onDeleteApprover);
  yield takeEvery(GET_ROLES, fetchRoles);
  yield takeEvery(ADD_NEW_ROLE, onAddNewRole);
  yield takeEvery(UPDATE_ROLE, onUpdateRole);
  yield takeEvery(DELETE_ROLE, onDeleteRole);
}

export default contactsSaga;
