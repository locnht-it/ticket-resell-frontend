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

export const useForgotPasswordApi = () => {
  const headers = useHeaders();

  const checkEmailForgotPassword = async (email) => {
    return await axios.post(
      `${REST_API_BASE_URL}/Authentication/check-email-forgot-password?email=${email}`,
      null,
      {
        headers: headers,
      }
    );
  };

  const validateEmailForgotPassword = async (token, id) => {
    return await axios.post(
      `${REST_API_BASE_URL}/Authentication/validate-email-forgot-password?token=${token}&id=${id}`,
      null,
      {
        headers: headers,
      }
    );
  };

  const resendOTPEmailForgotPassword = async (email, id) => {
    return await axios.post(
      `${REST_API_BASE_URL}/Authentication/resend-otp-email-forgot-password?email=${email}&id=${id}`,
      null,
      {
        headers: headers,
      }
    );
  };

  const changeForgotPassword = async (email, password) => {
    return await axios.post(
      `${REST_API_BASE_URL}/Authentication/change-forgot-password?email=${email}&password=${password}`,
      null,
      {
        headers: headers,
      }
    );
  };

  return {
    checkEmailForgotPassword,
    validateEmailForgotPassword,
    resendOTPEmailForgotPassword,
    changeForgotPassword,
  };
};
