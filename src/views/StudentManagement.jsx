import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from '../components/Form';
import Table from '../components/Table';
import * as Yup from 'yup';
import Error from '../components/Error';

const studentModel = {
  fields: [
    { name: 'name', label: 'Student Name', type: 'text', required: true },
    { name: 'gender', label: 'Gender', type: 'text', required: true },
    { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
    { name: 'contactDetails', label: 'Contact Details', type: 'text', required: true },
    { name: 'feesPaid', label: 'Fees Paid', type: 'checkbox', required: true },
    { name: 'class', label: 'Class ID', type: 'text', required: true },
  ],
};

const columns = [
  {Header: 'Student Id', accessor: '_id'},
  { Header: 'Student Name', accessor: 'name' },
  { Header: 'Gender', accessor: 'gender' },
  { Header: 'Date of Birth', accessor: 'dob' },
  { Header: 'Contact Details', accessor: 'contactDetails' },
  { Header: 'Fees Paid', accessor: 'feesPaid' },
  { Header: 'Class', accessor: 'class' },
];

const validationSchema = Yup.object().shape(
  studentModel.fields.reduce((acc, field) => {
    if (field.required) {
      acc[field.name] = field.type === 'number'
        ? Yup.number().required(`${field.label} is required`)
        : Yup.string().required(`${field.label} is required`);
    }
    return acc;
  }, {})
);

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      const formattedData = response.data.map(item => ({
        _id: item._id,
        name: item.name,
        gender: item.gender,
        dob: item.dob,
        contactDetails: item.contactDetails,
        feesPaid: item.feesPaid ? 'Yes' : 'No',
        class: item.class ? item.class.name : 'N/A'
      }))
      setStudents(formattedData);
    } catch (err) {
      console.error('Failed to fetch students', err);
      setError('Failed to fetch students');
    }
  };

  const addStudent = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/students', data);
      fetchStudents();
    } catch (err) {
      console.error('Failed to add student', err);
      setError('Failed to add student');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>
      <Error message={error} />
      <Form model={studentModel} onSubmit={addStudent} validationSchema={validationSchema} />
      <Table columns={columns} data={students} />
    </div>
  );
};

export default StudentManagement;
