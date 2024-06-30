import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
const fetchComplaints = async () => {
  try {
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

    const response = await fetch('http://localhost:5000/api/GetAllComplaints ',{
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch complaints');
    }
    const data = await response.json();
    console.log('Data from API:', data); 
    return data;
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return [];
  }
};

const Admin = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints().then(data => {
      console.log('Data before setting state:', data); 
      setComplaints(data);
    });
  }, []);

  console.log('Complaints state:', complaints); 

  const handleBackToLogin = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    navigate('/Login');
  };

  return (
    <div className="container mt-4">
      <h1 className="alert alert-info text-center">Admin - Complaint Manager</h1>
      <div id="complaints-container" className="mt-4">
        <ul className="list-group">
          {complaints.map(complaint => (
            <li key={complaint._id} className="list-group-item">
            <strong>Title:</strong> {complaint.title}<br />
            <strong>Description:</strong> {complaint.description}<br />
            <strong>Department:</strong> {complaint.department}<br />
            <strong>Nature:</strong> {complaint.nature}<br />
            {complaint.image && (
              <img src={`http://localhost:5000/${complaint.image}`} alt="Complaint" className="img-fluid mt-2" style={{ maxWidth: '200px' }} />
            )}
          </li>
          
          ))}
        </ul>
      </div>
      <button className="btn btn-info mt-4" onClick={handleBackToLogin}>
        Logout
      </button>
    </div>
  );
};

export default Admin;