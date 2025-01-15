import React, { useState, useEffect } from "react";
import axios from "axios";
import '../index.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("RegularUser");
  const [permissions, setPermissions] = useState("");
  const [newPermissions, setNewPermissions] = useState("");
  const [newRoles, setNewRoles] = useState("");

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/list_users/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      await axios.post(
        "http://localhost:8000/create_user/",
        { username, password, roles: [roles], permissions: permissions.split(",") },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("User added successfully");
      fetchUsers();
    } catch (error) {
      console.error("Failed to add user:", error);
      alert("Failed to add user");
    }
  };

  const handleDeleteUser = async (username) => {
    try {
      await axios.delete(`http://localhost:8000/delete_user/?username=${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user");
    }
  };

  const handleUpdatePermissions = async (username) => {
    try {
      await axios.put(
        "http://localhost:8000/update_permissions/",
        {
          username,
          permissions: newPermissions.split(",").map((perm) => perm.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Permissions updated successfully");
      fetchUsers();
    } catch (error) {
      console.error("Failed to update permissions:", error.response?.data || error.message);
      alert("Failed to update permissions");
    }
  };

  const handleUpdateRoles = async (username) => {
    try {
      await axios.put(
        "http://localhost:8000/update_roles/",
        {
          username,
          roles: newRoles.split(",").map((role) => role.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Roles updated successfully");
      fetchUsers();
    } catch (error) {
      console.error("Failed to update roles:", error.response?.data || error.message);
      alert("Failed to update roles");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Users</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Create New User</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <select
              value={roles}
              onChange={(e) => setRoles(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Admin">Admin</option>
              <option value="RegularUser">Regular User</option>
            </select>
            <input
              type="text"
              placeholder="Permissions (comma-separated)"
              value={permissions}
              onChange={(e) => setPermissions(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleAddUser}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add User
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Existing Users</h3>
          <ul className="space-y-4">
            {users.map((user) => (
              <li key={user.username} className="p-4 border rounded shadow-sm">
                <p>
                  <strong>Username:</strong> {user.username} | <strong>Roles:</strong>{" "}
                  {user.roles.join(", ")} | <strong>Permissions:</strong>{" "}
                  {user.permissions.join(", ")}
                </p>
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => handleDeleteUser(user.username)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="New Permissions (comma-separated)"
                      onChange={(e) => setNewPermissions(e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => handleUpdatePermissions(user.username)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Update Permissions
                    </button>
                    <input
                      type="text"
                      placeholder="New Roles (comma-separated)"
                      onChange={(e) => setNewRoles(e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => handleUpdateRoles(user.username)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      Update Roles
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
