import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USERS,
  GET_APPROVERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  ADD_NEW_USER,
  ADD_NEW_APPROVER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER,
  UPDATE_APPROVER,
  DELETE_APPROVER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  ADD_APPROVER_SUCCESS,
  ADD_APPROVER_FAIL,
  // GET_APPROVERS_FAIL,
  // UPDATE_APPROVER_SUCCESS,
  // DELETE_APPROVER_SUCCESS,
  // DELETE_APPROVER_FAIL,
} from "./actionTypes";

export const getUsers = () => ({
  type: GET_USERS,
});
export const getApprovers = () => ({
  type: GET_APPROVERS,
});

export const getUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: users,
});
export const getApproversSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: users,
});

export const addNewUser = (user) => ({
  type: ADD_NEW_USER,
  payload: user,
});
export const addNewApprover = (user) => ({
  type: ADD_NEW_APPROVER,
  payload: user,
});

export const addUserSuccess = (user) => ({
  type: ADD_USER_SUCCESS,
  payload: user,
});
export const addApproverSuccess = (user) => ({
  type: ADD_APPROVER_SUCCESS,
  payload: user,
});

export const addUserFail = (error) => ({
  type: ADD_USER_FAIL,
  payload: error,
});
export const addApproverFail = (error) => ({
  type: ADD_APPROVER_FAIL,
  payload: error,
});

export const getUsersFail = (error) => ({
  type: GET_USERS_FAIL,
  payload: error,
});
// export const getApproversFail = (error) => ({
//   type: GET_APPROVERS_FAIL,
//   payload: error,
// });

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
export const updateApprover = (user) => ({
  type: UPDATE_APPROVER,
  payload: user,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});
// export const updateApproverSuccess = (user) => ({
//   type: UPDATE_APPROVER_SUCCESS,
//   payload: user,
// });

export const updateUserFail = (error) => ({
  type: UPDATE_USER_FAIL,
  payload: error,
});

export const deleteUser = (user) => ({
  type: DELETE_USER,
  payload: user,
});
export const deleteApprover = (user) => ({
  type: DELETE_APPROVER,
  payload: user,
});

export const deleteUserSuccess = (user) => ({
  type: DELETE_USER_SUCCESS,
  payload: user,
});
// export const deleteApproverSuccess = (user) => ({
//   type: DELETE_APPROVER_SUCCESS,
//   payload: user,
// });

export const deleteUserFail = (error) => ({
  type: DELETE_USER_FAIL,
  payload: error,
});
// export const deleteApproverFail = (error) => ({
//   type: DELETE_APPROVER_FAIL,
//   payload: error,
// });
