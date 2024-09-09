import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Userdetail.css'; // Import file CSS

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/user/users/${id}`)
      .then(response => {
        setUser(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleGoBack = () => {
    navigate('/body');
  };

  return (
    <div className="user-detail-container">
      <h2>User Detail</h2>
      <p><span>Username:</span> {user.username}</p>
      <p><span>Email:</span> {user.email}</p>
      <p><span>Role:</span> {user.role}</p>
      <button onClick={handleGoBack} className="go-back-button">Go Back</button>
    </div>
  );
};

export default UserDetail;
