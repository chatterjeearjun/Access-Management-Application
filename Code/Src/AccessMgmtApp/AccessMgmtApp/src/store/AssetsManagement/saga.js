import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_ASSETS,
  GET_ASSET_OVERVIEW,
  ADD_NEW_ASSET,
  DELETE_ASSET,
  UPDATE_ASSET,
  GET_ASSETS_ASSOCIATION,
} from "./actionTypes";

import {
  getAssetsSuccess,
  getAssetsFail,
  getAssetOverviewSuccess,
  getAssetOverviewFail,
  addAssetFail,
  addAssetSuccess,
  updateAssetSuccess,
  updateAssetFail,
  deleteAssetSuccess,
  deleteAssetFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getAssets,
  addNewAsset,
  updateAsset,
  deleteAsset,
  getAssetOverview,
} from "../../helpers/fakebackend_helper";

//AssetsManagement

function* fetchAssets() {
  try {
    const response = yield call(getAssets);
    yield put(getAssetsSuccess(response));
  } catch (error) {
    yield put(getAssetsFail(error));
  }
}
function* fetchAssetOverview({ payload: id }) {
  try {
    const response = yield call(getAssetOverview, id);
    yield put(getAssetOverviewSuccess(response));
  } catch (error) {
    yield put(getAssetOverviewFail(error));
  }
}

function* onUpdateAsset({ payload: asset }) {
  try {
    const response = yield call(updateAsset, asset);

    yield put(updateAssetSuccess(response));
  } catch (error) {
    yield put(updateAssetFail(error));
  }
}

function* onDeleteAsset({ payload: user }) {
  try {
    yield call(deleteAsset, user);
    yield put(deleteAssetSuccess(user));
  } catch (error) {
    yield put(deleteAssetFail(error));
  }
}

function* onAddNewAsset({ payload: user }) {
  try {
    const response = yield call(addNewAsset, user);
    yield put(addAssetSuccess(response));
  } catch (error) {
    yield put(addAssetFail(error));
  }
}

function* assetsSaga() {
  yield takeEvery(GET_ASSETS, fetchAssets);
  yield takeEvery(GET_ASSET_OVERVIEW, fetchAssetOverview);
  yield takeEvery(ADD_NEW_ASSET, onAddNewAsset);
  yield takeEvery(UPDATE_ASSET, onUpdateAsset);
  yield takeEvery(DELETE_ASSET, onDeleteAsset);
}

export default assetsSaga;
