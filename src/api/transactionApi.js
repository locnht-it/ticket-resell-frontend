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

export const useTransactionApi = () => {
  const headers = useHeaders();

  const getAllTransactions = async (startDate, endDate, limit, page) => {
    return await axios.get(REST_API_BASE_URL + "/Transaction/get-all-admin", {
      params: {
        startDate: startDate,
        endDate: endDate,
        limit: limit,
        page: page,
      },
      headers: headers,
    });
  };

  const getTransactionByTransactionId = async (transId) => {
    return await axios.get(REST_API_BASE_URL + "/Transaction/get-by-id-admin", {
      params: {
        transId: transId,
      },
      headers: headers,
    });
  };

  const getTotalRevenue = async () => {
    return await axios.get(REST_API_BASE_URL + "/Transaction/total-revenue", {
      headers: headers,
    });
  };

  return {
    getAllTransactions,
    getTransactionByTransactionId,
    getTotalRevenue,
  };
};
