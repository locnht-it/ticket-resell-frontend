import axios from "axios";
import { useAuth } from "../AuthContext";

const REST_API_BASE_URL = "http://localhost:5220/api";

export const useHeaders = () => {
  const { auth } = useAuth();
  return {
    Authorization: `Bearer ${auth.token}`,
  };
};

export const useUserApi = () => {
  const headers = useHeaders();

  const editProfile = async (profile) => {
    return await axios.post(
      REST_API_BASE_URL + "/User/edit-profile-user",
      profile,
      {
        headers: headers,
      }
    );
  };

  const getAllUsers = async (page, limit) => {
    return await axios.get(REST_API_BASE_URL + "/User/get-all-user", {
      params: {
        page: page,
        limit: limit,
      },
      headers: headers,
    });
  };

  return { editProfile, getAllUsers };
};
