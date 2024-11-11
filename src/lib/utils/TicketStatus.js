import React from "react";

const getTicketStatus = (status) => {
  switch (status) {
    case `PENDING`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-sky-600 bg-sky-100">
          {status.replaceAll(`_`, ` `).toLowerCase()}
        </span>
      );
    case `ACTIVE`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-green-600 bg-green-100">
          {status.replaceAll(`_`, ` `).toLowerCase()}
        </span>
      );
    case `CLOSED`:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-teal-600 bg-teal-100">
          {status.replaceAll(`_`, ` `).toLowerCase()}
        </span>
      );
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-sm text-xs text-gray-600 bg-gray-100">
          {status.replaceAll(`_`, ` `).toLowerCase()}
        </span>
      );
  }
};

export default getTicketStatus;
