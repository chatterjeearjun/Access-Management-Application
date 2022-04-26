import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_ROLES,
  ADD_NEW_ROLE,
  DELETE_ROLE,
  UPDATE_ROLE,
} from "./actionTypes";

import {
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
  getRoles,
  addNewRole,
  updateRole,
  deleteRole,
} from "../../helpers/fakebackend_helper";

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

    yield put(updateRoleSuccess(response));
  } catch (error) {
    yield put(updateRoleFail(error));
  }
}

function* onDeleteRole({ payload: user }) {
  try {
    yield call(deleteRole, user);
    yield put(deleteRoleSuccess(user));
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

function* rolesSaga() {
  yield takeEvery(GET_ROLES, fetchRoles);
  yield takeEvery(ADD_NEW_ROLE, onAddNewRole);
  yield takeEvery(UPDATE_ROLE, onUpdateRole);
  yield takeEvery(DELETE_ROLE, onDeleteRole);
}

export default rolesSaga;
