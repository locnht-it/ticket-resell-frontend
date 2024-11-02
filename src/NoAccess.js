import React from "react";
import { Link } from "react-router-dom";

const NoAccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        403 - Không có quyền truy cập
      </h1>
      <p className="text-lg mb-8">Bạn không có quyền truy cập vào trang này.</p>
      <Link to="/" className="text-blue-500 underline">
        Quay về trang chủ
      </Link>
    </div>
  );
};

export default NoAccess;
