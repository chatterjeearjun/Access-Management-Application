import {
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
  assets: [],
  error: {},
  result: "",
};

const assetsManagement = (state = INIT_STATE, action) => {
  switch (action.type) {
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

export default assetsManagement;
