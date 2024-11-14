import React from "react";

const getOrderStatus = (status) => {
  switch (status) {
    case `Pending`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-sm text-sky-600 bg-sky-100">
          {status}
        </span>
      );
    case `Cancelled`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-sm text-orange-600 bg-orange-100">
          {status}
        </span>
      );
    case `Done`:
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

export default getOrderStatus;
