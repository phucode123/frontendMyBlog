import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigator = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(username + " " + password);
      const response = await axios.post('http://localhost:8080/api/login', {
        "username": username,
        "password": password,
      });

      console.log(response);
      if (response.status===200) {
        // Lưu token hoặc thông tin người dùng vào localStorage hoặc sessionStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(response.data);

        // Điều hướng đến trang Body
        navigator('/');

      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
