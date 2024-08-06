import React from 'react';

const LoadingSpinner = ({size=8, color = 'orange-500' }) => {
  return (
    <div
      className={`flex items-center justify-center w-[${size}vh] h-[${size}vh]`}
    >
      <svg
        className={`animate-spin h-full w-full text-${color}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
        ></circle>
        <path
          className="opacity-75"
          d="M4 12a8 8 0 0 1 16 0M4 12a8 8 0 0 1 16 0"
        ></path>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
