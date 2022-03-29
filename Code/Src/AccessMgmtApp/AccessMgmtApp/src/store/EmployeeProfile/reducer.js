import {
  GET_EMPLOYEE_PROFILE_SUCCESS,
  GET_EMPLOYEE_PROFILE_FAIL,
} from "./actionsTypes";

const INIT_STATE = {
  employee: [],
  error: {},
};

const employeeProfileReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_PROFILE_SUCCESS:
      return {
        ...state,
        employee: action.payload,
      };

    case GET_EMPLOYEE_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default employeeProfileReducer;
