import {
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
} from "./actionTypes";

const INIT_STATE = {
  approvers: [],
  error: {},
  result: "",
};

const adminTeam = (state = INIT_STATE, action) => {
  switch (action.type) {
    // Approvers Cases

    case GET_APPROVERS_SUCCESS:
      return {
        ...state,
        approvers: action.payload,
        result: "",
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
      return {
        ...state,
        approvers: state.approvers.filter(
          (approver) => approver.id.toString() !== action.payload.id.toString()
        ),
        result: "approver delete success",
      };

    case DELETE_APPROVER_FAIL:
      return {
        ...state,
        error: action.payload,
        result: "delete fail",
      };

    case GET_APPROVER_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default adminTeam;
