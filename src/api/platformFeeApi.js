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

export const usePlatformFeeApi = () => {
  const headers = useHeaders();

  const getAllPlatformFees = async (page, limit) => {
    return await axios.get(
      REST_API_BASE_URL + "/PlatformFee/get-platform-fee/all",
      {
        params: {
          page: page,
          limit: limit,
        },
        headers: headers,
      }
    );
  };

  return {
    getAllPlatformFees,
  };
};
