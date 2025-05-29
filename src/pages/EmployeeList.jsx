import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function EmployeesList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/company/employees', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(response.data.employees);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch employees');
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-4">
      <h2 className="text-2xl font-semibold mb-4">Your Employees</h2>
      <div className="bg-white shadow rounded p-4">
        {employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <ul className="divide-y">
            {employees.map((emp) => (
              <li key={emp._id} className="py-2">
                <strong>{emp.name}</strong> – {emp.email} ({emp.role})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
