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

  const getAllPlatformFees = async (query, page, limit) => {
    return await axios.get(
      REST_API_BASE_URL + "/PlatformFee/get-platform-fee/all",
      {
        params: {
          query: query,
          page: page,
          limit: limit,
        },
        headers: headers,
      }
    );
  };

  const getAllPlatformFeesNoSearch = async (page, limit) => {
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

  const createPlatformFee = async (platformFee) => {
    return await axios.post(
      REST_API_BASE_URL + "/PlatformFee/add-platform-fee",
      platformFee,
      {
        headers: headers,
      }
    );
  };

  const changePlatformFeeStatus = async (platformFeeId) => {
    return await axios.post(
      `${REST_API_BASE_URL}/PlatformFee/change-status/${platformFeeId}`,
      null,
      {
        headers: headers,
      }
    );
  };

  return {
    getAllPlatformFees,
    getAllPlatformFeesNoSearch,
    createPlatformFee,
    changePlatformFeeStatus,
  };
};
