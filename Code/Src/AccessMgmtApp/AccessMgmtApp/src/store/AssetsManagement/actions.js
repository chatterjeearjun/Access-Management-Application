import {
  GET_ASSETS,
  GET_ASSETS_FAIL,
  GET_ASSETS_SUCCESS,
  ADD_NEW_ASSET,
  ADD_ASSET_SUCCESS,
  ADD_ASSET_FAIL,
  UPDATE_ASSET,
  UPDATE_ASSET_SUCCESS,
  UPDATE_ASSET_FAIL,
  DELETE_ASSET,
  DELETE_ASSET_SUCCESS,
  DELETE_ASSET_FAIL,
  GET_ASSETS_ASSOCIATION,
  GET_ASSETS_ASSOCIATION_FAIL,
  GET_ASSETS_ASSOCIATION_SUCCESS,
} from "./actionTypes";

//AssetsManagement

export const getAssets = () => ({
  type: GET_ASSETS,
});

export const getAssetsSuccess = (users) => ({
  type: GET_ASSETS_SUCCESS,
  payload: users,
});

export const addNewAsset = (user) => ({
  type: ADD_NEW_ASSET,
  payload: user,
});

export const addAssetSuccess = (user) => ({
  type: ADD_ASSET_SUCCESS,
  payload: user,
});

export const addAssetFail = (error) => ({
  type: ADD_ASSET_FAIL,
  payload: error,
});

export const getAssetsFail = (error) => ({
  type: GET_ASSETS_FAIL,
  payload: error,
});

export const updateAsset = (asset) => ({
  type: UPDATE_ASSET,
  payload: asset,
});

export const updateAssetSuccess = (user) => ({
  type: UPDATE_ASSET_SUCCESS,
  payload: user,
});

export const updateAssetFail = (error) => ({
  type: UPDATE_ASSET_FAIL,
  payload: error,
});

export const deleteAsset = (user) => ({
  type: DELETE_ASSET,
  payload: user,
});

export const deleteAssetSuccess = (user) => ({
  type: DELETE_ASSET_SUCCESS,
  payload: user,
});

export const deleteAssetFail = (error) => ({
  type: DELETE_ASSET_FAIL,
  payload: error,
});
