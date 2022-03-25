import {
  GET_ASSETS_SUCCESS,
  GET_ASSETS_FAIL,
  GET_ASSET_OVERVIEW_SUCCESS,
  GET_ASSET_OVERVIEW_FAIL,
  ADD_ASSET_SUCCESS,
  ADD_ASSET_FAIL,
  UPDATE_ASSET_SUCCESS,
  UPDATE_ASSET_FAIL,
  DELETE_ASSET_SUCCESS,
  DELETE_ASSET_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  assets: [],
  asset: [],
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
    case GET_ASSET_OVERVIEW_SUCCESS:
      return {
        ...state,
        asset: action.payload,
      };

    case GET_ASSET_OVERVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_ASSET_SUCCESS:
      debugger;
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
        result: "Asset Deleted",
      };

    case DELETE_ASSET_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default assetsManagement;
