import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_TICKETS,
  ADD_NEW_TICKET,
  DELETE_TICKET,
  UPDATE_TICKET,
} from "./actionTypes";

import {
  getTicketsSuccess,
  getTicketsFail,
  addTicketFail,
  addTicketSuccess,
  updateTicketSuccess,
  updateTicketFail,
  deleteTicketSuccess,
  deleteTicketFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getTickets,
  addNewTicket,
  updateTicket,
  deleteTicket,
} from "../../helpers/fakebackend_helper";

//TicketsManagement

function* fetchTickets() {
  try {
    const response = yield call(getTickets);
    yield put(getTicketsSuccess(response));
  } catch (error) {
    yield put(getTicketsFail(error));
  }
}

function* onUpdateTicket({ payload: asset }) {
  try {
    const response = yield call(updateTicket, asset);

    yield put(updateTicketSuccess(response));
  } catch (error) {
    yield put(updateTicketFail(error));
  }
}

function* onDeleteTicket({ payload: user }) {
  try {
    yield call(deleteTicket, user);
    yield put(deleteTicketSuccess(user));
  } catch (error) {
    yield put(deleteTicketFail(error));
  }
}

function* onAddNewTicket({ payload: user }) {
  try {
    const response = yield call(addNewTicket, user);
    yield put(addTicketSuccess(response));
  } catch (error) {
    yield put(addTicketFail(error));
  }
}

function* ticketsSaga() {
  yield takeEvery(GET_TICKETS, fetchTickets);
  yield takeEvery(ADD_NEW_TICKET, onAddNewTicket);
  yield takeEvery(UPDATE_TICKET, onUpdateTicket);
  yield takeEvery(DELETE_TICKET, onDeleteTicket);
}

export default ticketsSaga;
