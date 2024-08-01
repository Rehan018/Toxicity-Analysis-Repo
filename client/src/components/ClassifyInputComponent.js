import React, { useState } from 'react';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';
import API_URL from '../config'; // Ensure this is defined in the config file
import '../styles.css';
import './classifyInput.css';

const ClassifyInputComponent = ({ setSelectedPrediction }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        `${API_URL}/classify`,
        { text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newPrediction = {
        input: text,
        predictions: res.data.predictions,
      };
      setSelectedPrediction(newPrediction); // Update selected prediction
      setText('');
    } catch (err) {
      setError('Error classifying text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="classify-input">
      <h1>Classify Text</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={text}
            placeholder="Classify Text"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Classifying...' : 'Classify'}
        </button>
      </form>
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default ClassifyInputComponent;
