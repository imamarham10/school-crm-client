import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import ClassManagement from './views/ClassManagement';
import TeacherManagement from './views/TeacherManagement';
import StudentManagement from './views/StudentManagement';
import ClassAnalytics from './views/ClassAnalytics';
import ExpenseAnalytics from './views/ExpenseAnalytics';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/classes" element={<ClassManagement />} />
      <Route path="/teachers" element={<TeacherManagement />} />
      <Route path="/students" element={<StudentManagement />} />
      <Route path="/classes/:id/analytics" element={<ClassAnalytics />} />
      <Route path="/analytics/expenses" element={<ExpenseAnalytics />} />
    </Routes>
  );
}

export default App;
