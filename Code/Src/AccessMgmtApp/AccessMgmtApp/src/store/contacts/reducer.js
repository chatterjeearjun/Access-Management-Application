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
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAIL,
  GET_ASSETS_SUCCESS,
  GET_ASSETS_FAIL,
  ADD_ASSET_SUCCESS,
  ADD_ASSET_FAIL,
  UPDATE_ASSET_SUCCESS,
  UPDATE_ASSET_FAIL,
  DELETE_ASSET_SUCCESS,
  DELETE_ASSET_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  users: [],
  approvers: [],
  assets: [],
  groups: [],
  userProfile: {},
  error: {},
  result: {},
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

    case GET_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload,
      };

    case GET_GROUPS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
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
          user.id.toString() === action.payload.id.toString()
            ? { user, ...action.payload }
            : user
        ),
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
          approver.id.toString() === action.payload.id.toString()
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

    //AssetsManagement

    case GET_ASSETS_SUCCESS:
      return {
        ...state,
        assets: action.payload,
      };

    case GET_ASSETS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_ASSET_SUCCESS:
      return {
        ...state,
        assets: [...state.assets, action.payload],
      };

    case ADD_ASSET_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_ASSET_SUCCESS:
      debugger;
      return {
        ...state,
        assets: state.assets.map((asset) =>
          asset.id.toString() === action.payload.id.toString()
            ? { asset, ...action.payload }
            : asset
        ),
      };

    case UPDATE_ASSET_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_ASSET_SUCCESS:
      debugger;
      return {
        ...state,
        assets: state.assets.filter(
          (asset) => asset.id.toString() !== action.payload.id.toString()
        ),
        result: "success",
      };

    case DELETE_ASSET_FAIL:
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
