import axios from "axios";
import { useAuth } from "../AuthContext";

const REST_API_BASE_URL = "http://localhost:5220/api";

export const useHeaders = () => {
  const { auth } = useAuth();
  return {
    Authorization: `Bearer ${auth.token}`,
  };
};

export const useCategoryApi = () => {
  const headers = useHeaders();

  const getAllCategories = async (searchTerm, page, limit) => {
    return await axios.get(REST_API_BASE_URL + "/TicketCategory/categories", {
      params: {
        searchTerm: searchTerm,
        page: page,
        limit: limit,
      },
      headers: headers,
    });
  };

  const createCategory = async (categoryName) => {
    return await axios.post(
      REST_API_BASE_URL + "/TicketCategory/new-category",
      null,
      {
        categoryName: categoryName,
        headers: headers,
      }
    );
  };

  const getCategoryByCategoryId = async (id) => {
    return await axios.get(REST_API_BASE_URL + "/TicketCategory/category", {
      params: {
        id: id,
      },
      headers: headers,
    });
  };

  return {
    getAllCategories,
    createCategory,
    getCategoryByCategoryId,
  };
};
