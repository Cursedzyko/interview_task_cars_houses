import React, { useEffect, useState } from "react";
import { getCars } from "../services/api";

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
        <div>
            <h1>Cars</h1>
            <ul>
                {cars.map((car) => (
                <li key={car.id}>{`${car.brand} ${car.model} (${car.year})`}</li>
                ))}
            </ul>
        </div>
    );
};

export default CarsPage;
