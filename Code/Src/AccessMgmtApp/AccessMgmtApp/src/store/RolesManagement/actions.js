import {
  GET_ROLES,
  GET_ROLES_FAIL,
  GET_ROLES_SUCCESS,
  ADD_NEW_ROLE,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAIL,
  UPDATE_ROLE,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAIL,
  DELETE_ROLE,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAIL,
} from "./actionTypes";

//RolesManagement

export const getRoles = () => ({
  type: GET_ROLES,
});

export const getRolesSuccess = (users) => ({
  type: GET_ROLES_SUCCESS,
  payload: users,
});

export const addNewRole = (user) => ({
  type: ADD_NEW_ROLE,
  payload: user,
});

export const addRoleSuccess = (user) => ({
  type: ADD_ROLE_SUCCESS,
  payload: user,
});

export const addRoleFail = (error) => ({
  type: ADD_ROLE_FAIL,
  payload: error,
});

export const getRolesFail = (error) => ({
  type: GET_ROLES_FAIL,
  payload: error,
});

export const updateRole = (asset) => ({
  type: UPDATE_ROLE,
  payload: asset,
});

export const updateRoleSuccess = (user) => ({
  type: UPDATE_ROLE_SUCCESS,
  payload: user,
});

export const updateRoleFail = (error) => ({
  type: UPDATE_ROLE_FAIL,
  payload: error,
});

export const deleteRole = (user) => ({
  type: DELETE_ROLE,
  payload: user,
});

export const deleteRoleSuccess = (user) => ({
  type: DELETE_ROLE_SUCCESS,
  payload: user,
});

export const deleteRoleFail = (error) => ({
  type: DELETE_ROLE_FAIL,
  payload: error,
});
