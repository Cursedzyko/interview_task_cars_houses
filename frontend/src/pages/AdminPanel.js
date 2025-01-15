import { Link } from "react-router-dom";


const AdminPanel = () => {

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Cars</h2>
      <ul>
        <li><Link to="/cars">Cars</Link></li>
        <li><Link to="/houses">Houses</Link></li>
        <li><Link to="/manage-users">Manage Users</Link></li>
      </ul>
    </div>
  );
};

export default AdminPanel;
