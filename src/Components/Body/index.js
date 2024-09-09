// Body.jsx
import React from 'react';
import './Body.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Header from '../Header';
import UserPage from './UserPage';

const Body = () => {
    return (
        <div className="container_body">
            <Header />

            <Routes>
                <Route  path="/" element={<Home />} />
                <Route path="/user/:id" element={<UserPage />} />
            </Routes>

        </div>
    );
};

export default Body;
