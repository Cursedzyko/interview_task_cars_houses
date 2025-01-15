import React, { useEffect, useState } from "react";
import { getHouses } from "../services/api";

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
        <div>
            <h1>Houses</h1>
            <ul>
                {houses.map((house) => (
                <li key={house.id}>{`${house.address} - $${house.price}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default HousesPage;
