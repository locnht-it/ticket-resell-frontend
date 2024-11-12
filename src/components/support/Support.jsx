import React from "react";

const Support = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mt-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Need Support?
        </h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          If you have any questions or need assistance, contact to via contact
          email.
        </p>
        <div className="flex flex-col items-center">
          <a
            href="mailto:tripwonder@example.com"
            className="text-blue-500 underline"
          >
            locnht.it@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Support;
