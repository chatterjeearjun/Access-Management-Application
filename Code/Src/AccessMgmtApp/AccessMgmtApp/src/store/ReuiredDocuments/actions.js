import {
  GET_DOCS,
  GET_DOCS_FAIL,
  GET_DOCS_SUCCESS,
  ADD_NEW_DOC,
  ADD_DOC_SUCCESS,
  ADD_DOC_FAIL,
  UPDATE_DOC,
  UPDATE_DOC_SUCCESS,
  UPDATE_DOC_FAIL,
} from "./actionTypes";

//DocsManagement

export const getDocs = () => ({
  type: GET_DOCS,
});

export const getDocsSuccess = (docs) => ({
  type: GET_DOCS_SUCCESS,
  payload: docs,
});

export const getDocsFail = (error) => ({
  type: GET_DOCS_FAIL,
  payload: error,
});

export const addNewDoc = (doc) => ({
  type: ADD_NEW_DOC,
  payload: doc,
});

export const addDocSuccess = (doc) => ({
  type: ADD_DOC_SUCCESS,
  payload: doc,
});

export const addDocFail = (error) => ({
  type: ADD_DOC_FAIL,
  payload: error,
});
export const updateDoc = (doc) => ({
  type: UPDATE_DOC,
  payload: doc,
});

export const updateDocSuccess = (doc) => ({
  type: UPDATE_DOC_SUCCESS,
  payload: doc,
});

export const updateDocFail = (error) => ({
  type: UPDATE_DOC_FAIL,
  payload: error,
});
