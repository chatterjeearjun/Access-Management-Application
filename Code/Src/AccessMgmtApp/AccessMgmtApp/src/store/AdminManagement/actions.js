import {
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
} from "./actionTypes";

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
