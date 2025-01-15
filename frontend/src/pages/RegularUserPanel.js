import React from "react";
import { Link } from "react-router-dom";
import '../index.css';

const RegularUserPanel = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Regular User Panel</h2>
        <p className="text-gray-600 mb-6">Welcome to the Regular User Panel!</p>
        <ul className="space-y-4">
          <li>
            <Link
              to="/cars"
              className="block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              View Cars
            </Link>
          </li>
          <li>
            <Link
              to="/houses"
              className="block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            >
              View Houses
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RegularUserPanel;
