import React, { useEffect, useState } from "react";
import { getCars } from "../services/api";
import '../index.css';

const CarsPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await getCars();
        setCars(response.data.cars);
      } catch (error) {
        alert("Error fetching cars: " + error.response.data.detail);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Cars</h1>
        <ul className="space-y-4">
          {cars.map((car) => (
            <li
              key={car.id}
              className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{`${car.brand} ${car.model}`}</h2>
                <p className="text-gray-600">Year: {car.year}</p>
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

export default CarsPage;
