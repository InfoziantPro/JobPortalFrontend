import React, { useState } from 'react';
import apiClient from '../api/apiClient';
import { useAuth } from '../context/AuthContext';

export default function JobForm() {
  const { role } = useAuth();

  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salaryRange: '',
    jobType: '',
  });

  const [message, setMessage] = useState(null);

  if (role !== 'admin') {
    return <p className="text-red-600 p-4">Access denied. Admins only.</p>;
  }

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/jobs/postjob', jobData);
      setMessage('Job posted successfully!');
    } catch (error) {
      setMessage('Failed to post job.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">Post a New Job</h2>
      {message && <p className="mb-4">{message}</p>}
      {['title', 'description', 'company', 'location', 'salaryRange', 'jobType'].map(field => (
        <input
          key={field}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={jobData[field]}
          onChange={handleChange}
          required={['title', 'description', 'company'].includes(field)}
          className="border p-2 w-full mb-2"
        />
      ))}
      <button type="submit" className="bg-green-600 text-white px-4 py-2">Post Job</button>
    </form>
  );
}
