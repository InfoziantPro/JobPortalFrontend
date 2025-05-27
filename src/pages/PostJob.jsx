import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PostJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('Remote');
  const [salaryFrom, setSalaryFrom] = useState('');
  const [salaryTo, setSalaryTo] = useState('');
  const [jobType, setJobType] = useState('Full-time');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to post a job');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/jobs/postjob',
        {
          title,
          description,
          company,
          location,
          salaryRange: {
            from: salaryFrom ? Number(salaryFrom) : undefined,
            to: salaryTo ? Number(salaryTo) : undefined,
          },
          jobType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Job posted successfully!');
      // Clear form
      setTitle('');
      setDescription('');
      setCompany('');
      setLocation('Remote');
      setSalaryFrom('');
      setSalaryTo('');
      setJobType('Full-time');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to post job');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="input"
      />
      <textarea
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="input h-32"
      />
      <input
        type="text"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
        className="input"
      />
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="input"
        >
        <option value="Remote">Remote</option>
        <option value="In-person">In-person</option>
        <option value="Hybrid">Hybrid</option>
      </select>
      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="Salary From"
          value={salaryFrom}
          onChange={(e) => setSalaryFrom(e.target.value)}
          className="input flex-1"
        />
        <input
          type="number"
          placeholder="Salary To"
          value={salaryTo}
          onChange={(e) => setSalaryTo(e.target.value)}
          className="input flex-1"
        />
      </div>
      <select
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        className="input"
      >
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
        <option value="Internship">Internship</option>
      </select>
      <button type="submit" className="btn w-full">Post Job</button>
    </form>
  );
};

export default PostJob;
