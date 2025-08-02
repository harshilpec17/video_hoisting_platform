import React from "react";

const ErrorPage = ({ message }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-3xl font-bold text-red-600 mb-4">
      Service Unavailable
    </h1>
    <h1 className="text-3xl font-bold text-orange-600 mb-4">
      Try to switch to another network
    </h1>
    <p className="text-lg text-gray-700 mb-2">
      {message ||
        "We are experiencing technical difficulties. Please try again later."}
    </p>
    <button
      className="mt-4 px-4 py-2 bg-[#ae7aff] text-white rounded"
      onClick={() => window.location.reload()}
    >
      Retry
    </button>
  </div>
);

export default ErrorPage;
