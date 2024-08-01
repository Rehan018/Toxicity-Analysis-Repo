import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';

const HeaderComponent = () => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="header">
      {username ? (
        <>
          <button className="header-button" onClick={handleLogout}>Logout</button>
          <div className="user-info">User: {username}</div>
        </>
      ) : (
        <>
          <Link to="/login">
            <button className="header-button">Login</button>
          </Link>
          <Link to="/register">
            <button className="header-button">Register</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderComponent;
