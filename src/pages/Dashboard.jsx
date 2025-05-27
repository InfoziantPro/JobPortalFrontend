import JobForm from '../components/JobForm';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const handlePostJob = async (data) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/jobs/postjob', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Job posted successfully!');
    } catch (err) {
      toast.error('Failed to post job');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Post a New Job</h2>
      <JobForm onSubmit={handlePostJob} />
    </div>
  );
};

export default Dashboard;
