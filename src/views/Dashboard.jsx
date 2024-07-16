// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <nav className="mb-4">
        <ul className="list-disc pl-5">
          <li><Link to="/teachers" className="text-blue-500">Teacher Management</Link></li>
          <li><Link to="/students" className="text-blue-500">Student Management</Link></li>
          <li><Link to="/classes" className="text-blue-500">Class Management</Link></li>
          <li><Link to="/analytics/expenses" className="text-blue-500">Financial Analytics</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
