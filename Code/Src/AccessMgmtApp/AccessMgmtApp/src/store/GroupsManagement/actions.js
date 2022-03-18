import {
  GET_COMPGROUPS,
  GET_COMPGROUPS_FAIL,
  GET_COMPGROUPS_SUCCESS,
  ADD_NEW_COMPGROUP,
  ADD_COMPGROUP_SUCCESS,
  ADD_COMPGROUP_FAIL,
  UPDATE_COMPGROUP,
  UPDATE_COMPGROUP_SUCCESS,
  UPDATE_COMPGROUP_FAIL,
  DELETE_COMPGROUP,
  DELETE_COMPGROUP_SUCCESS,
  DELETE_COMPGROUP_FAIL,
} from "./actionTypes";

//CompGroupsManagement

export const getCompGroups = () => ({
  type: GET_COMPGROUPS,
});

export const getCompGroupsSuccess = (groups) => ({
  type: GET_COMPGROUPS_SUCCESS,
  payload: groups,
});

export const addNewCompGroup = (group) => ({
  type: ADD_NEW_COMPGROUP,
  payload: group,
});

export const addCompGroupSuccess = (group) => ({
  type: ADD_COMPGROUP_SUCCESS,
  payload: group,
});

export const addCompGroupFail = (error) => ({
  type: ADD_COMPGROUP_FAIL,
  payload: error,
});

export const getCompGroupsFail = (error) => ({
  type: GET_COMPGROUPS_FAIL,
  payload: error,
});

export const updateCompGroup = (asset) => ({
  type: UPDATE_COMPGROUP,
  payload: asset,
});

export const updateCompGroupSuccess = (group) => ({
  type: UPDATE_COMPGROUP_SUCCESS,
  payload: group,
});

export const updateCompGroupFail = (error) => ({
  type: UPDATE_COMPGROUP_FAIL,
  payload: error,
});

export const deleteCompGroup = (group) => ({
  type: DELETE_COMPGROUP,
  payload: group,
});

export const deleteCompGroupSuccess = (group) => ({
  type: DELETE_COMPGROUP_SUCCESS,
  payload: group,
});

export const deleteCompGroupFail = (error) => ({
  type: DELETE_COMPGROUP_FAIL,
  payload: error,
});
