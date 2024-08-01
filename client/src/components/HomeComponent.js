// HomeComponent.js
import React, { useState } from 'react';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import '../style/pop.css';

const HomeComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState(''); 

  const handlePopup = (type) => {
    setPopupType(type);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupType('');
  };

  return (
    <div className="home-container">
      <div className="home-section project-info">
        <h1>Toxicity Analytics</h1>
        <p>This is a brief description of the project.</p>
      </div>
      <div className="home-section empty-section"></div>
      <div className="home-section home-buttons">
        <button className="home-button" onClick={() => handlePopup('login')}>Login</button>
        <button className="home-button" onClick={() => handlePopup('register')}>Register</button>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-popup" onClick={closePopup}>X</button>
            {popupType === 'login' ? <LoginComponent /> : <RegisterComponent />}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeComponent;
