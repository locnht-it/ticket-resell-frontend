import React from "react";

const getUserStatus = (status) => {
  switch (status) {
    case `Inactive`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-sm text-orange-600 bg-orange-100">
          {status}
        </span>
      );
    case `Active`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-sm text-green-600 bg-green-100">
          {status}
        </span>
      );
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-sm text-gray-600 bg-gray-100">
          {status}
        </span>
      );
  }
};

export default getUserStatus;
