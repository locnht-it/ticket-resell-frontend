import React from "react";

const getUserRole = (role) => {
  switch (role) {
    case "ADMIN":
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-sky-600 bg-sky-100">
          ADMIN
        </span>
      );
    case "STAFF":
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-teal-600 bg-teal-100">
          STAFF
        </span>
      );
    case "CUSTOMER":
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-yellow-600 bg-yellow-100">
          CUSTOMER
        </span>
      );
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-gray-600 bg-gray-100">
          OTHERS
        </span>
      );
  }
};

export default getUserRole;
