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
  GET_APPROVERS_SUCCESS,
  GET_APPROVERS_FAIL,
  ADD_APPROVER_SUCCESS,
  ADD_APPROVER_FAIL,
  UPDATE_APPROVER_SUCCESS,
  UPDATE_APPROVER_FAIL,
  DELETE_APPROVER_SUCCESS,
  DELETE_APPROVER_FAIL,
  GET_APPROVER_PROFILE_SUCCESS,
  GET_APPROVER_PROFILE_FAIL,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAIL,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAIL,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAIL,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  users: [],
  approvers: [],
  assets: [],
  userProfile: {},
  error: {},
  result: "",
  roles: [],
};

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
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
      debugger;
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
      debugger;
      return {
        ...state,
        users: state.users.filter(
          (user) => user.id.toString() !== action.payload.id.toString()
        ),
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

    // Approvers Cases

    case GET_APPROVERS_SUCCESS:
      return {
        ...state,
        approvers: action.payload,
      };

    case GET_APPROVERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_APPROVER_SUCCESS:
      return {
        ...state,
        approvers: [...state.approvers, action.payload],
      };

    case ADD_APPROVER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_APPROVER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
      };

    case UPDATE_APPROVER_SUCCESS:
      debugger;
      return {
        ...state,
        approvers: state.approvers.map((approver) =>
          approver.approver_identifier.toString() ===
          action.payload.approver_identifier.toString()
            ? { approver, ...action.payload }
            : approver
        ),
      };

    case UPDATE_APPROVER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_APPROVER_SUCCESS:
      debugger;
      return {
        ...state,
        approvers: state.approvers.filter(
          (approver) => approver.id.toString() !== action.payload.id.toString()
        ),
        result: "success",
      };

    case DELETE_APPROVER_FAIL:
      return {
        ...state,
        error: action.payload,
        result: "success",
      };

    case GET_APPROVER_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    //RolesManagement

    case GET_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.payload,
      };

    case GET_ROLES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_ROLE_SUCCESS:
      return {
        ...state,
        roles: [...state.roles, action.payload],
      };

    case ADD_ROLE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_ROLE_SUCCESS:
      debugger;
      return {
        ...state,
        roles: state.roles.map((role) =>
          role.role_identifier.toString() ===
          action.payload.role_identifier.toString()
            ? { role, ...action.payload }
            : role
        ),
      };

    case UPDATE_ROLE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_ROLE_SUCCESS:
      debugger;
      return {
        ...state,
        roles: state.roles.filter(
          (role) => role.id.toString() !== action.payload.id.toString()
        ),
        result: "success",
      };

    case DELETE_ROLE_FAIL:
      return {
        ...state,
        error: action.payload,
        result: "success",
      };

    default:
      return state;
  }
};

export default contacts;
