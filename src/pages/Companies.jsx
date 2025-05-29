import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/approved/companies', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompanies(res.data.approvedCompanies);
      } catch (err) {
        toast.error(err.response?.data?.error || 'Failed to load companies');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Approved Companies</h2>
      {loading ? (
        <p>Loading...</p>
      ) : companies.length === 0 ? (
        <p>No approved companies found.</p>
      ) : (
        <div className="bg-white shadow rounded p-4">
          <ul className="divide-y">
            {companies.map((company) => (
              <li key={company._id} className="py-3">
                <p className="font-medium">{company.name}</p>
                <p className="text-sm text-gray-600">{company.email}</p>
                <p className="text-xs text-gray-400">
                  Joined: {new Date(company.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
