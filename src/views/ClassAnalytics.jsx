import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ClassAnalytics = () => {
  const { id } = useParams(); 
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/classes/${id}/analytics`);
        setClassData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching class data:', error);
        setLoading(false);
      }
    };

    fetchClassData();
  }, [id]);
  if (loading) return <p>Loading...</p>;

   if (!classData) return <p>No data available</p>;

   const normalizeGender = (gender) => gender.toLowerCase();
  const maleCount = classData.class.students ? classData.class.students.filter(student => normalizeGender(student.gender) === 'male').length : 0;
  const femaleCount = classData.class.students ? classData.class.students.filter(student => normalizeGender(student.gender) === 'female').length : 0;

  const chartData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Number of Students',
        data: [maleCount, femaleCount],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Class Analytics</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Class Details</h2>
        <p><strong>Class Name:</strong> {classData.class.name}</p>
        <p><strong>Year:</strong> {classData.class.year}</p>
        <p><strong>Teacher:</strong> {classData.class.teacher ? classData.class.teacher.name : 'N/A'}</p>
        <p><strong>Student Fees:</strong> {classData.class.studentFees}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Students List</h2>
        <ul>
          {classData.class.students && classData.class.students.length > 0 ? (
            classData.class.students.map(student => (
              <li key={student._id}>{student.name}</li>
            ))
          ) : (
            <li>No students enrolled</li>
          )}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Gender Distribution</h2>
        {classData.class.students && classData.class.students.length > 0 ? (
          <Bar data={chartData} />
        ) : (
          <p>No students data available for the chart.</p>
        )}
      </div>
    </div>
  );
};

export default ClassAnalytics;
