import React from "react";

const getUserRole = (role) => {
  switch (role) {
    case 1:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-sm text-sky-600 bg-sky-100">
          ADMIN
        </span>
      );
    case "ADMIN":
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-sm text-sky-600 bg-sky-100">
          ADMIN
        </span>
      );
    case 2:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-sm text-teal-600 bg-teal-100">
          STAFF
        </span>
      );
    case "STAFF":
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-sm text-teal-600 bg-teal-100">
          STAFF
        </span>
      );

    case 0:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-sm text-yellow-600 bg-yellow-100">
          CUSTOMER
        </span>
      );
    case "CUSTOMER":
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-sm text-yellow-600 bg-yellow-100">
          CUSTOMER
        </span>
      );
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-sm text-gray-600 bg-gray-100">
          OTHERS
        </span>
      );
  }
};

export default getUserRole;
