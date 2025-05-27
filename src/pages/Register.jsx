import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/register', { name, email, password });
      toast.success('Registration successful');
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="input" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input" />
      <button type="submit" className="btn">Register</button>
    </form>
  );
};

export default Register;

