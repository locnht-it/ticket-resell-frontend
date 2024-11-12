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

export const useDashboardApi = () => {
  const headers = useHeaders();

  const getNumberOfCustomerForEachMonth = async (month, year) => {
    return await axios.get(
      REST_API_BASE_URL + "/User/get-all-number-of-user-by-month-and-year",
      {
        params: {
          month: month,
          year: year,
        },
        headers: headers,
      }
    );
  };

  const getNumberOfGenderCustomer = async () => {
    return await axios.get(REST_API_BASE_URL + "/User/get-number-gender", {
      headers: headers,
    });
  };

  return { getNumberOfCustomerForEachMonth, getNumberOfGenderCustomer };
};
