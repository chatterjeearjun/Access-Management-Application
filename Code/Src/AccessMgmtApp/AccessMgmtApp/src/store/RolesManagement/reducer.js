import {
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
  error: {},
  result: "",
  roles: [],
};

const rolesManagement = (state = INIT_STATE, action) => {
  switch (action.type) {
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

export default rolesManagement;
