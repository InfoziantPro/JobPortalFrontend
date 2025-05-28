import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resendLinkVisible, setResendLinkVisible] = useState(false);
  const navigate = useNavigate();
  const [verificationLink, setVerificationLink] = useState(null);


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/api/login', { email, password });
    const { token, user } = response.data;

    // ✅ Email verification check (only for candidates)
    if (user.role === 'user' && !user.emailVerified) {
      toast.error('Please verify your email before logging in.');
      setResendLinkVisible(true);
      setVerificationLink(response.data.emailVerificationLink); // <--- GET THE LINK
      return;
    }

    // ✅ Approval status check (only for admin)
    if (user.role === 'admin' && user.status !== 'approved') {
      toast.warn('Your account is pending approval by the Super Admin.');
      return;
    }

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);

    toast.success('Login successful');
    navigate('/');
  } catch (error) {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 403 && data?.emailVerificationLink) {
      setVerificationLink(data.emailVerificationLink);
      setResendLinkVisible(true);
    }

    toast.error(data?.error || 'Login failed');
  }
};


  const handleResendVerification = async () => {
    try {
      await axios.post('http://localhost:5000/api/resend-verification', { email });
      toast.success('Verification email resent!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to resend email');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
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
      <button type="submit" className="btn w-full">Login</button>

      {resendLinkVisible && (
  <div className="text-sm text-center mt-4 space-y-2">
    {verificationLink && (
      <p>
        Click to verify:{" "}
        <a
          href={verificationLink}
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Verify Email
        </a>
      </p>
    )}
  </div>
)}

    </form>
  );
};

export default Login;
