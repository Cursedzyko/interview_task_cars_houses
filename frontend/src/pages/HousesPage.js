import React, { useEffect, useState } from "react";
import { getHouses } from "../services/api";
import '../index.css';

const HousesPage = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await getHouses();
        setHouses(response.data.houses);
      } catch (error) {
        alert("Error fetching houses: " + error.response.data.detail);
      }
    };
    fetchHouses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Houses</h1>
        <ul className="space-y-4">
          {houses.map((house) => (
            <li
              key={house.id}
              className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{house.address}</h2>
                <p className="text-gray-600">Price: ${house.price}</p>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                View Details
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HousesPage;
