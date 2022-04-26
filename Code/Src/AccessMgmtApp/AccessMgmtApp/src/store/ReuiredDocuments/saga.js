import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { GET_DOCS, ADD_NEW_DOC, UPDATE_DOC } from "./actionTypes";

import {
  getDocsSuccess,
  getDocsFail,
  addDocFail,
  addDocSuccess,
  updateDocFail,
  updateDocSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getDocs,
  addNewDoc,
  updateDoc,
} from "../../helpers/fakebackend_helper";

//DocsManagement

function* fetchDocs() {
  try {
    const response = yield call(getDocs);
    yield put(getDocsSuccess(response));
  } catch (error) {
    yield put(getDocsFail(error));
  }
}

function* onAddNewDoc({ payload: doc }) {
  try {
    const response = yield call(addNewDoc, doc);
    yield put(addDocSuccess(response));
  } catch (error) {
    yield put(addDocFail(error));
  }
}

function* onUpdateDoc({ payload: doc }) {
  try {
    const response = yield call(updateDoc, doc);
    yield put(updateDocSuccess(response));
  } catch (error) {
    yield put(updateDocFail(error));
  }
}

function* docsSaga() {
  yield takeEvery(GET_DOCS, fetchDocs);
  yield takeEvery(ADD_NEW_DOC, onAddNewDoc);
  yield takeEvery(UPDATE_DOC, onUpdateDoc);
}

export default docsSaga;
