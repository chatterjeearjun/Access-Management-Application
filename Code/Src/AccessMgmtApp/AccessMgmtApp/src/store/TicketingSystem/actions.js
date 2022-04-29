import {
  GET_TICKETS,
  GET_TICKETS_FAIL,
  GET_TICKETS_SUCCESS,
  ADD_NEW_TICKET,
  ADD_TICKET_SUCCESS,
  ADD_TICKET_FAIL,
  UPDATE_TICKET,
  UPDATE_TICKET_SUCCESS,
  UPDATE_TICKET_FAIL,
  DELETE_TICKET,
  DELETE_TICKET_SUCCESS,
  DELETE_TICKET_FAIL,
} from "./actionTypes";

//TicketsManagement

export const getTickets = () => ({
  type: GET_TICKETS,
});

export const getTicketsSuccess = (tickets) => ({
  type: GET_TICKETS_SUCCESS,
  payload: tickets,
});

export const addNewTicket = (ticket) => ({
  type: ADD_NEW_TICKET,
  payload: ticket,
});

export const addTicketSuccess = (ticket) => ({
  type: ADD_TICKET_SUCCESS,
  payload: ticket,
});

export const addTicketFail = (error) => ({
  type: ADD_TICKET_FAIL,
  payload: error,
});

export const getTicketsFail = (error) => ({
  type: GET_TICKETS_FAIL,
  payload: error,
});

export const updateTicket = (asset) => ({
  type: UPDATE_TICKET,
  payload: asset,
});

export const updateTicketSuccess = (ticket) => ({
  type: UPDATE_TICKET_SUCCESS,
  payload: ticket,
});

export const updateTicketFail = (error) => ({
  type: UPDATE_TICKET_FAIL,
  payload: error,
});

export const deleteTicket = (ticket) => ({
  type: DELETE_TICKET,
  payload: ticket,
});

export const deleteTicketSuccess = (ticket) => ({
  type: DELETE_TICKET_SUCCESS,
  payload: ticket,
});

export const deleteTicketFail = (error) => ({
  type: DELETE_TICKET_FAIL,
  payload: error,
});
