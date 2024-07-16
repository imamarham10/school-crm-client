import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from '../components/Form';
import Table from '../components/Table';
import * as Yup from 'yup';
import Error from '../components/Error';

const teacherModel = {
  fields: [
    { name: 'name', label: 'Teacher Name', type: 'text', required: true },
    { name: 'gender', label: 'Gender', type: 'text', required: true },
    { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
    { name: 'contactDetails', label: 'Contact Details', type: 'text', required: true },
    { name: 'salary', label: 'Salary', type: 'number', required: true },
  ],
};

const columns = [
  { Header: 'Teacher ID', accessor: '_id' },
  { Header: 'Teacher Name', accessor: 'name' },
  { Header: 'Gender', accessor: 'gender' },
  { Header: 'Date of Birth', accessor: 'dob' },
  { Header: 'Contact Details', accessor: 'contactDetails' },
  { Header: 'Salary', accessor: 'salary' },
];

const validationSchema = Yup.object().shape(
  teacherModel.fields.reduce((acc, field) => {
    if (field.required) {
      acc[field.name] = field.type === 'number'
        ? Yup.number().required(`${field.label} is required`)
        : Yup.string().required(`${field.label} is required`);
    }
    return acc;
  }, {})
);

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('https://school-crm-backend.vercel.app/api/teachers');
      setTeachers(response.data);
    } catch (err) {
      console.error('Failed to fetch teachers', err);
      setError(`Failed to fetch teachers`);
    }
  };

  const addTeacher = async (data) => {
    try {
      await axios.post('https://school-crm-backend.vercel.app/api/teachers', data);
      fetchTeachers();
    } catch (err) {
      console.error('Failed to add teacher', err);
      setError('Failed to add teacher');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teacher Management</h1>
      <Error message={error} />
      <Form model={teacherModel} onSubmit={addTeacher} validationSchema={validationSchema} />
      <Table columns={columns} data={teachers} />
    </div>
  );
};

export default TeacherManagement;
