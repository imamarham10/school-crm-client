import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('yearly');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    fetchAnalyticsData();
  }, [view, year, month]);

  const fetchAnalyticsData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/analytics/financial', {
        params: { view, year, month },
      });
      setAnalyticsData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!analyticsData) return <p>No data available</p>;

  const chartData = {
    labels: ['Total Salary Expenses', 'Total Income from Students'],
    datasets: [
      {
        label: 'Amount in USD',
        data: [analyticsData.totalSalaryExpenses, analyticsData.totalIncomeFromStudents],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Financial Analytics</h1>
      <div className="flex items-center mb-4">
        <label className="mr-4">View:</label>
        <select value={view} onChange={(e) => setView(e.target.value)} className="mr-4">
          <option value="yearly">Yearly</option>
          <option value="monthly">Monthly</option>
        </select>
        {view === 'monthly' && (
          <>
            <label className="mr-4">Month:</label>
            <select value={month} onChange={(e) => setMonth(e.target.value)} className="mr-4">
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </>
        )}
        <label className="mr-4">Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="mr-4"
        />
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Total Salary Expenses</h2>
        <p>Rs { analyticsData.totalSalaryExpenses}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Total Income from Students</h2>
        <p>Rs { analyticsData.totalIncomeFromStudents}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Financial Overview</h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseAnalytics;
