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
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="candidate">Candidate</option>
          <option value="company">Company</option>
        </select>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>
      </form>

      {verifyUrl && (
        <div className="text-sm text-center text-gray-600 mt-4 space-y-2">
          <p className="text-green-600 font-medium">Registration successful. Please verify your email:</p>
          <a
            href={verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline font-medium hover:text-blue-800"
          >
            Verify Email
          </a>
        </div>
      )}
    </div>
  </div>
);

};

export default Register;
