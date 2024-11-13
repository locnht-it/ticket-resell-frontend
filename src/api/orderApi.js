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

export const useOrderApi = () => {
  const headers = useHeaders();

  const getAllOrders = async (startDay, endDay, page, limit) => {
    return await axios.get(
      REST_API_BASE_URL + "/Order/get-order-by-start-day-end-date",
      {
        params: {
          startDay: startDay,
          endDay: endDay,
          page: page,
          limit: limit,
        },
        headers: headers,
      }
    );
  };

  return {
    getAllOrders,
  };
};
