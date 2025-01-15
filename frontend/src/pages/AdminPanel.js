import { Link } from "react-router-dom";
import '../index.css';

const AdminPanel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Panel</h1>
        <ul className="space-y-4">
          <li>
            <Link
              to="/cars"
              className="block py-2 px-4 bg-blue-500 text-white rounded text-center hover:bg-blue-600 transition"
            >
              Cars
            </Link>
          </li>
          <li>
            <Link
              to="/houses"
              className="block py-2 px-4 bg-green-500 text-white rounded text-center hover:bg-green-600 transition"
            >
              Houses
            </Link>
          </li>
          <li>
            <Link
              to="/manage-users"
              className="block py-2 px-4 bg-purple-500 text-white rounded text-center hover:bg-purple-600 transition"
            >
              Manage Users
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
