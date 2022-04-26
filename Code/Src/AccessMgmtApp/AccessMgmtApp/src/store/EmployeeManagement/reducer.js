import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  users: [],
  userProfile: {},
  error: {},
  result: "",
};

const employeesManagement = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        result: "",
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        result: "add user success",
      };

    case ADD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.employee_identifier.toString() ===
          action.payload.employee_identifier.toString()
            ? { user, ...action.payload }
            : user
        ),
        result: "edit user success",
      };

    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(
          (user) => user.id.toString() !== action.payload.id.toString()
        ),
        result: "Employee Deleted",
      };

    case DELETE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default employeesManagement;
