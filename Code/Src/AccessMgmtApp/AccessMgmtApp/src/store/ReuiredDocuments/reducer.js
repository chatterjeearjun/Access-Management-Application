import {
  GET_DOCS_SUCCESS,
  GET_DOCS_FAIL,
  ADD_DOC_SUCCESS,
  ADD_DOC_FAIL,
  UPDATE_DOC_SUCCESS,
  UPDATE_DOC_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  docs: [],
  error: {},
  result: "",
};

const docsManagement = (state = INIT_STATE, action) => {
  switch (action.type) {
    //AssetsManagement

    case GET_DOCS_SUCCESS:
      return {
        ...state,
        docs: action.payload,
        result: "",
      };

    case GET_DOCS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_DOC_SUCCESS:
      debugger;
      return {
        ...state,
        docs: action.payload,
        result: "Add Doc Success",
      };

    case ADD_DOC_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_DOC_SUCCESS:
      debugger;
      return {
        ...state,
        docs: action.payload,
        result: "Update Doc Success",
      };

    case UPDATE_DOC_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default docsManagement;
