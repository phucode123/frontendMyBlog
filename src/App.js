import React from 'react';
import LoginForm from './Components/loginsignup/login';
import Signup from './Components/loginsignup/signup';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Body from './Components/Body';
import Header from './Components/Header';
import UserDetail from './Components/Body/detail';
import PrivateRoute from './PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path="/*" element={<Body />} />
            {/* //<Route path="/userPage/:id" element={<UserDetail />} /> */}
          </Route>
          <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to login if no route matches */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
