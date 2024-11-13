import React from "react";

const getPostStatus = (status) => {
  switch (status) {
    case `PENDING`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-sky-600 bg-sky-100">
          {status}
        </span>
      );
    case `ACTIVE`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-green-600 bg-green-100">
          {status}
        </span>
      );
    case `CLOSED`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-teal-600 bg-teal-100">
          {status}
        </span>
      );
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-gray-600 bg-gray-100">
          {status}
        </span>
      );
  }
};

export default getPostStatus;
