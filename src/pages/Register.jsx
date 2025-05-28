import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate');
  const [verifyUrl, setVerifyUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/register/${role}`, { name, email, password });
      toast.success('Registration successful. Please verify your email.');
      setVerifyUrl(response.data.emailVerificationLink);  // <-- use backend key here
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="input"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input"
          required
        />

        {/* Dropdown for Role */}
        <select value={role} onChange={(e) => setRole(e.target.value)} className="input">
          <option value="candidate">Candidate</option>
          <option value="company">Company</option>
          <option value="employee">Employee</option>
        </select>

        <button type="submit" className="btn w-full">Register</button>
      </form>

      {/* Show Verify Email button if verifyUrl is present */}
      {verifyUrl && (
        <div className="mt-4 text-center">
          <p>Click below to verify your email:</p>
          <a
            href={verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-2"
          >
            Verify Email
          </a>
        </div>
      )}
    </div>
  );
};

export default Register;
