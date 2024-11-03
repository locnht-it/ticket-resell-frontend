import axios from "axios";
import { useAuth } from "../AuthContext";

const REST_API_BASE_URL = "http://localhost:5220/api";

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

  return { getNumberOfCustomerForEachMonth };
};
