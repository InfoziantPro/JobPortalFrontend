import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { toast } from 'react-toastify';
import register from '../assets/Register.png';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Eye icons for password visibility

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate');
  const [verifyUrl, setVerifyUrl] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility toggle
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(`/register/${role}`, {
        name,
        email,
        password,
      });
      toast.success('Registration successful. Please verify your email.');
      setVerifyUrl(response.data.emailVerificationLink);
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Side Visual */}
      <div className="hidden md:flex w-1/2 h-full">
        <img
          src={register}
          alt="Register Visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 h-full overflow-y-auto bg-white flex flex-col items-center justify-center px-6 py-10">
        <h2 className="text-2xl font-jost mb-10 text-gray-800 text-center">
          Create a Free Account
        </h2>

        {/* Role toggle buttons */}
        <div className="flex gap-6 mb-6">
          <button
            type="button"
            onClick={() => setRole('candidate')}
            className={`text-lg px-12 py-3 rounded-lg font-jost transition ${
              role === 'candidate'
                ? 'bg-gradient-to-r from-purple-800 to-violet-500 text-white shadow-lg'
                : 'bg-purple-100 text-purple-800'
            }`}
          >
            Candidate
          </button>
          <button
            type="button"
            onClick={() => setRole('company')}
            className={`text-lg px-12 py-3 rounded-lg font-jost transition ${
              role === 'company'
                ? 'bg-gradient-to-r from-purple-800 to-violet-500 text-white shadow-lg'
                : 'bg-purple-100 text-purple-800'
            }`}
          >
            Organisation
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}  // Toggle between text and password input type
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <span
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}  // Toggle visibility on icon click
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {isPasswordVisible ? (
                <FiEyeOff size={16} className="text-gray-600" />  // Eye icon to hide password
              ) : (
                <FiEye size={16} className="text-gray-600" />  // Eye icon to show password
              )}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg bg-blue-600 text-white font-jost rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Verification Link */}
        {verifyUrl && (
          <div className="text-sm text-center text-gray-600 mt-4 space-y-2">
            <p className="text-green-600 font-jost">
              Registration successful. Please verify your email:
            </p>
            <a
              href={verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline font-jost hover:text-blue-800"
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
