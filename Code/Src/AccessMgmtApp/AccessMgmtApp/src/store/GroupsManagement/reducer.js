import {
  GET_COMPGROUPS_SUCCESS,
  GET_COMPGROUPS_FAIL,
  ADD_COMPGROUP_SUCCESS,
  ADD_COMPGROUP_FAIL,
  UPDATE_COMPGROUP_SUCCESS,
  UPDATE_COMPGROUP_FAIL,
  DELETE_COMPGROUP_SUCCESS,
  DELETE_COMPGROUP_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  groups: [],
  error: {},
  result: "",
};

const compGroups = (state = INIT_STATE, action) => {
  switch (action.type) {
    //GroupsManagement

    case GET_COMPGROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload,
      };

    case GET_COMPGROUPS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_COMPGROUP_SUCCESS:
      return {
        ...state,
        groups: [...state.groups, action.payload],
      };

    case ADD_COMPGROUP_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_COMPGROUP_SUCCESS:
      debugger;
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.group_identifier.toString() ===
          action.payload.group_identifier.toString()
            ? { group, ...action.payload }
            : group
        ),
      };

    case UPDATE_COMPGROUP_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_COMPGROUP_SUCCESS:
      debugger;
      return {
        ...state,
        groups: state.groups.filter(
          (group) => group.id.toString() !== action.payload.id.toString()
        ),
        result: "success",
      };

    case DELETE_COMPGROUP_FAIL:
      return {
        ...state,
        error: action.payload,
        result: "success",
      };

    default:
      return state;
  }
};

export default compGroups;
