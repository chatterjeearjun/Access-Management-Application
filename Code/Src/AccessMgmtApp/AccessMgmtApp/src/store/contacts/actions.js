import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USERS,
  GET_GROUPS,
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
  GET_GROUPS_FAIL,
  GET_ASSETS,
  GET_ASSETS_FAIL,
  GET_ASSETS_SUCCESS,
  ADD_NEW_ASSET,
  ADD_ASSET_SUCCESS,
  ADD_ASSET_FAIL,
  UPDATE_ASSET,
  UPDATE_ASSET_SUCCESS,
  UPDATE_ASSET_FAIL,
  DELETE_ASSET,
  DELETE_ASSET_SUCCESS,
  DELETE_ASSET_FAIL,
} from "./actionTypes";

export const getUsers = () => ({
  type: GET_USERS,
});
export const getEmpGroups = () => ({
  type: GET_GROUPS,
});

export const getUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: users,
});
export const getGroupsSuccess = (groups) => ({
  type: GET_USERS_SUCCESS,
  payload: groups,
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
export const getGroupsFail = (error) => ({
  type: GET_GROUPS_FAIL,
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

//AssetsManagement

export const getAssets = () => ({
  type: GET_ASSETS,
});

export const getAssetsSuccess = (users) => ({
  type: GET_ASSETS_SUCCESS,
  payload: users,
});

export const addNewAsset = (user) => ({
  type: ADD_NEW_ASSET,
  payload: user,
});

export const addAssetSuccess = (user) => ({
  type: ADD_ASSET_SUCCESS,
  payload: user,
});

export const addAssetFail = (error) => ({
  type: ADD_ASSET_FAIL,
  payload: error,
});

export const getAssetsFail = (error) => ({
  type: GET_ASSETS_FAIL,
  payload: error,
});

export const updateAsset = (asset) => ({
  type: UPDATE_ASSET,
  payload: asset,
});

export const updateAssetSuccess = (user) => ({
  type: UPDATE_ASSET_SUCCESS,
  payload: user,
});

export const updateAssetFail = (error) => ({
  type: UPDATE_ASSET_FAIL,
  payload: error,
});

export const deleteAsset = (user) => ({
  type: DELETE_ASSET,
  payload: user,
});

export const deleteAssetSuccess = (user) => ({
  type: DELETE_ASSET_SUCCESS,
  payload: user,
});

export const deleteAssetFail = (error) => ({
  type: DELETE_ASSET_FAIL,
  payload: error,
});
