import {
  GET_EMPLOYEE_PROFILE,
  GET_EMPLOYEE_PROFILE_FAIL,
  GET_EMPLOYEE_PROFILE_SUCCESS,
} from "./actionsTypes";

export const getEmployeeProfile = (id) => ({
  type: GET_EMPLOYEE_PROFILE,
  payload: id,
});

export const getEmployeeProfileSuccess = (employee) => ({
  type: GET_EMPLOYEE_PROFILE_SUCCESS,
  payload: employee,
});
export const getEmployeeProfileFail = (error) => ({
  type: GET_EMPLOYEE_PROFILE_FAIL,
  payload: error,
});
