import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem("authData");
    return savedAuth
      ? JSON.parse(savedAuth)
      : { isAuthenticated: false, user: null };
  });

  const signIn = async (email, password) => {
    const data = { email, password, fcmToken: null }; // Tạo dữ liệu cần gửi
    console.log(">>> Check data before call api signIn:", data); // Log dữ liệu ra console

    try {
      const response = await fetch(
        "http://localhost:5220/api/Authentication/sign-in",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data), // Chuyển đổi dữ liệu thành chuỗi JSON
        }
      );

      if (response.ok) {
        const dataResponse = await response.json();
        setAuth({ isAuthenticated: true, user: dataResponse.userDTO });
        localStorage.setItem(
          "authData",
          JSON.stringify({ isAuthenticated: true, user: dataResponse.userDTO })
        );
        return true;
      } else {
        alert("Sai thông tin đăng nhập");
        return false;
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      return false;
    }
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null });
    localStorage.removeItem("authData");
  };

  return (
    <AuthContext.Provider value={{ auth, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
