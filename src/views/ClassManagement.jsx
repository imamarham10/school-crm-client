import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from '../components/Form';
import Table from '../components/Table';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Error from '../components/Error';

const classModel = {
  fields: [
    { name: 'name', label: 'Class Name', type: 'text', required: true },
    { name: 'year', label: 'Year', type: 'number', required: true },
    { name: 'teacher', label: 'Teacher', type: 'text', required: true },
    { name: 'studentFees', label: 'Student Fees', type: 'number', required: true },
  ],
};

const columns = [
  { Header: 'Class Name', accessor: 'name' },
  { Header: 'Year', accessor: 'year' },
  { Header: 'Teacher', accessor: 'teacher' },
  { Header: 'Student Fees', accessor: 'studentFees' },
  {
    Header: 'Analytics',
    accessor: '_id',
    Cell: ({ value }) => <Link to={`/classes/${value}/analytics`}>View</Link>,
  },
];

const validationSchema = Yup.object().shape(
  classModel.fields.reduce((acc, field) => {
    if (field.required) {
      acc[field.name] = field.type === 'number'
        ? Yup.number().required(`${field.label} is required`)
        : Yup.string().required(`${field.label} is required`);
    }
    return acc;
  }, {})
);

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/classes');
      const formattedData = response.data.map(item => ({
        _id: item._id,
        name: item.name,
        year: item.year,
        teacher: item.teacher ? item.teacher.name : 'N/A', 
        studentFees: item.studentFees
      }));
      
      setClasses(formattedData);
    } catch (err) {
      
      setError('Failed to fetch classes');
    }
  };

  const addClass = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/classes', data);
      fetchClasses();
    } catch (err) {
  
      setError('Failed to add class');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Class Management</h1>
      <Error message={error} />
      <Form model={classModel} onSubmit={addClass} validationSchema={validationSchema} />
      <Table columns={columns} data={classes} />
    </div>
  );
};

export default ClassManagement;
