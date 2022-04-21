import {
  GET_DASHBOARD_DATA_SUCCESS,
  GET_DASHBOARD_DATA_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  dashboard: [],
  error: {},
  result: "",
};

const dashboardManagement = (state = INIT_STATE, action) => {
  switch (action.type) {
    //DashboardManagement

    case GET_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        dashboard: action.payload,
      };

    case GET_DASHBOARD_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default dashboardManagement;
