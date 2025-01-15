import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      <h2>Manage Users</h2>
      <div>
        <h3>Create New User</h3>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select onChange={(e) => setRoles(e.target.value)}>
          <option value="Admin">Admin</option>
          <option value="RegularUser">Regular User</option>
        </select>
        <input
          type="text"
          placeholder="Permissions (comma-separated)"
          value={permissions}
          onChange={(e) => setPermissions(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <div>
        <h3>Existing Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user.username}>
              <strong>Username:</strong> {user.username} | <strong>Roles:</strong> {user.roles.join(", ")} | <strong>Permissions:</strong> {user.permissions.join(", ")}
              <br />
              <button onClick={() => handleDeleteUser(user.username)}>Delete</button>
              <input
                type="text"
                placeholder="New Permissions (comma-separated)"
                onChange={(e) => setNewPermissions(e.target.value)}
              />
              <button onClick={() => handleUpdatePermissions(user.username)}>
                Update Permissions
              </button>
              <input
                type="text"
                placeholder="New Roles (comma-separated)"
                onChange={(e) => setNewRoles(e.target.value)}
              />
              <button onClick={() => handleUpdateRoles(user.username)}>
                Update Roles
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageUsers;

