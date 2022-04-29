import {
  GET_TICKETS_SUCCESS,
  GET_TICKETS_FAIL,
  ADD_TICKET_SUCCESS,
  ADD_TICKET_FAIL,
  UPDATE_TICKET_SUCCESS,
  UPDATE_TICKET_FAIL,
  DELETE_TICKET_SUCCESS,
  DELETE_TICKET_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  error: {},
  result: "",
  tickets: [],
};

const ticketingSystem = (state = INIT_STATE, action) => {
  switch (action.type) {
    //RolesManagement

    case GET_TICKETS_SUCCESS:
      return {
        ...state,
        tickets: action.payload,
      };

    case GET_TICKETS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_TICKET_SUCCESS:
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
      };

    case ADD_TICKET_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_TICKET_SUCCESS:
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket.ticket_identifier.toString() ===
          action.payload.ticket_identifier.toString()
            ? { ticket, ...action.payload }
            : ticket
        ),
      };

    case UPDATE_TICKET_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_TICKET_SUCCESS:
      return {
        ...state,
        tickets: state.tickets.filter(
          (ticket) => ticket.id.toString() !== action.payload.id.toString()
        ),
        result: "success",
      };

    case DELETE_TICKET_FAIL:
      return {
        ...state,
        error: action.payload,
        result: "success",
      };

    default:
      return state;
  }
};

export default ticketingSystem;
