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

  const createStaffUser = async (user) => {
    return await axios.post(
      REST_API_BASE_URL + "/Authentication/sign-up-for-staff",
      user,
      {
        headers: headers,
      }
    );
  };

  const getUserByUserId = async (id) => {
    return await axios.get(REST_API_BASE_URL + "/User/get-user-by-id", {
      params: {
        id: id,
      },
      headers: headers,
    });
  };

  const changeUserStatus = async (id) => {
    return await axios.get(REST_API_BASE_URL + "/User/change-active", {
      params: {
        id: id,
      },
      headers: headers,
    });
  };

  const searchUserByNameAndEmail = async (search) => {
    return await axios.get(REST_API_BASE_URL + "/User/search", {
      params: {
        search: search,
      },
      headers: headers,
    });
  };

  const getUsersByRole = async (role) => {
    return await axios.get(REST_API_BASE_URL + "/User/get-all-user-by-role", {
      params: {
        role: role,
      },
      headers: headers,
    });
  };

  return {
    editProfile,
    getAllUsers,
    createStaffUser,
    getUserByUserId,
    changeUserStatus,
    searchUserByNameAndEmail,
    getUsersByRole,
  };
};
