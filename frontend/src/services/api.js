import axios from "axios";

const API_URL = "http://localhost:8000"

const api = axios.create(
    {
        baseURL: API_URL,
    }
);

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const login = (data) => api.post("/login/", data);
export const createUser = async (userData) => {
    return axios.post("http://localhost:8000/register/", userData, {
        headers: { "Content-Type": "application/json" },
    });
};
export const updatePermissions = (username, permissions) =>
    api.put("/update_permissions/", { username, permissions });
export const deleteUser = (username) => api.delete("/delete_user/", { data: { username } });
export const getCars = () => api.get("/cars/");
export const getHouses = () => api.get("/houses/");
export const addMockData = () => api.post("/add_mock_data/");

export default api;
