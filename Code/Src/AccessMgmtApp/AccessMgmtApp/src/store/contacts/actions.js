import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  ADD_NEW_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_APPROVER_PROFILE,
  GET_APPROVER_PROFILE_FAIL,
  GET_APPROVER_PROFILE_SUCCESS,
  GET_APPROVERS,
  GET_APPROVERS_FAIL,
  GET_APPROVERS_SUCCESS,
  ADD_NEW_APPROVER,
  ADD_APPROVER_SUCCESS,
  ADD_APPROVER_FAIL,
  UPDATE_APPROVER,
  UPDATE_APPROVER_SUCCESS,
  UPDATE_APPROVER_FAIL,
  DELETE_APPROVER,
  DELETE_APPROVER_SUCCESS,
  DELETE_APPROVER_FAIL,
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

export const getUsers = () => ({
  type: GET_USERS,
});

export const getUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: users,
});

export const addNewUser = (user) => ({
  type: ADD_NEW_USER,
  payload: user,
});

export const addUserSuccess = (user) => ({
  type: ADD_USER_SUCCESS,
  payload: user,
});

export const addUserFail = (error) => ({
  type: ADD_USER_FAIL,
  payload: error,
});

export const getUsersFail = (error) => ({
  type: GET_USERS_FAIL,
  payload: error,
});

export const getUserProfile = () => ({
  type: GET_USER_PROFILE,
});

export const getUserProfileSuccess = (userProfile) => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: userProfile,
});

export const getUserProfileFail = (error) => ({
  type: GET_USER_PROFILE_FAIL,
  payload: error,
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserFail = (error) => ({
  type: UPDATE_USER_FAIL,
  payload: error,
});

export const deleteUser = (user) => ({
  type: DELETE_USER,
  payload: user,
});

export const deleteUserSuccess = (user) => ({
  type: DELETE_USER_SUCCESS,
  payload: user,
});

export const deleteUserFail = (error) => ({
  type: DELETE_USER_FAIL,
  payload: error,
});

// Approvers calls

export const getApprovers = () => ({
  type: GET_APPROVERS,
});

export const getApproversSuccess = (users) => ({
  type: GET_APPROVERS_SUCCESS,
  payload: users,
});

export const addNewApprover = (user) => ({
  type: ADD_NEW_APPROVER,
  payload: user,
});

export const addApproverSuccess = (user) => ({
  type: ADD_APPROVER_SUCCESS,
  payload: user,
});

export const addApproverFail = (error) => ({
  type: ADD_APPROVER_FAIL,
  payload: error,
});

export const getApproversFail = (error) => ({
  type: GET_APPROVERS_FAIL,
  payload: error,
});

export const getApproverProfile = () => ({
  type: GET_APPROVER_PROFILE,
});

export const getApproverProfileSuccess = (userProfile) => ({
  type: GET_APPROVER_PROFILE_SUCCESS,
  payload: userProfile,
});

export const getApproverProfileFail = (error) => ({
  type: GET_APPROVER_PROFILE_FAIL,
  payload: error,
});

export const updateApprover = (user) => ({
  type: UPDATE_APPROVER,
  payload: user,
});

export const updateApproverSuccess = (user) => ({
  type: UPDATE_APPROVER_SUCCESS,
  payload: user,
});

export const updateApproverFail = (error) => ({
  type: UPDATE_APPROVER_FAIL,
  payload: error,
});

export const deleteApprover = (user) => ({
  type: DELETE_APPROVER,
  payload: user,
});

export const deleteApproverSuccess = (user) => ({
  type: DELETE_APPROVER_SUCCESS,
  payload: user,
});

export const deleteApproverFail = (error) => ({
  type: DELETE_APPROVER_FAIL,
  payload: error,
});

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
