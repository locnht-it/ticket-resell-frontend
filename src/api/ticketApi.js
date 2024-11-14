import axios from "axios";
import { useAuth } from "../AuthContext";

const REST_API_BASE_URL =
  "https://ticketresellapi-ckhsduaycsfccjek.eastasia-01.azurewebsites.net/api";

export const useHeaders = () => {
  const { auth } = useAuth();
  return {
    Authorization: `Bearer ${auth.token}`,
  };
};

export const useTicketApi = () => {
  const headers = useHeaders();

  const getAllTickets = async (status, searchTerm, page, limit) => {
    return await axios.get(REST_API_BASE_URL + "/Ticket/get-list", {
      params: {
        status: status,
        searchTerm: searchTerm,
        page: page,
        limit: limit,
      },
      headers: headers,
    });
  };

  const changeTicketStatus = async (ticketId, status) => {
    return await axios.put(
      `${REST_API_BASE_URL}/Ticket/manager-action?ticketId=${ticketId}&status=${status}`,
      null,
      {
        headers: headers,
      }
    );
  };

  const getTicketByTicketId = async (ticketId) => {
    return await axios.get(REST_API_BASE_URL + "/Ticket/get", {
      params: {
        ticketId: ticketId,
      },
      headers: headers,
    });
  };

  return {
    getAllTickets,
    changeTicketStatus,
    getTicketByTicketId,
  };
};
