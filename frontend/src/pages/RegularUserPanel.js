import React from "react";
import { Link } from "react-router-dom";

const RegularUserPanel = () => {
  return (
    <div>
      <h2>Regular User Panel</h2>
      <p>Welcome to the Regular User Panel!</p>
      <ul>
        <li><Link to="/cars">Cars</Link></li>
        <li><Link to="/houses">Houses</Link></li>
      </ul>
    </div>
  );
};

export default RegularUserPanel;
