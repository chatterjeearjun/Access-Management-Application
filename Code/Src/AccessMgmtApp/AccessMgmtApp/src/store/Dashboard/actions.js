import {
  GET_DASHBOARD_DATA,
  GET_DASHBOARD_DATA_FAIL,
  GET_DASHBOARD_DATA_SUCCESS,
} from "./actionTypes";

//DashboardManagement

export const getDashboardData = (dates) => ({
  type: GET_DASHBOARD_DATA,
  payload: dates,
});

export const getDashboardDataSuccess = (users) => ({
  type: GET_DASHBOARD_DATA_SUCCESS,
  payload: users,
});

export const getDashboardDataFail = (error) => ({
  type: GET_DASHBOARD_DATA_FAIL,
  payload: error,
});
