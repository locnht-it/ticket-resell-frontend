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

export const usePostApi = () => {
  const headers = useHeaders();

  const getAllPosts = async (status, searchTerm, page, limit) => {
    return await axios.get(REST_API_BASE_URL + "/Post/get-lists", {
      params: {
        status: status,
        searchTerm: searchTerm,
        page: page,
        limit: limit,
      },
      headers: headers,
    });
  };

  const changePostStatus = async (postId, status) => {
    return await axios.put(
      `${REST_API_BASE_URL}/Post/manager-action?postId=${postId}&status=${status}`,
      null,
      {
        headers: headers,
      }
    );
  };

  const getPostByPostId = async (id) => {
    return await axios.get(REST_API_BASE_URL + "/Post/get", {
      params: {
        id: id,
      },
      headers: headers,
    });
  };

  return {
    getAllPosts,
    changePostStatus,
    getPostByPostId,
  };
};
