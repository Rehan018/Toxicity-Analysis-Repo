import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';

const MainContentComponent = ({ selectedPrediction }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      const token = localStorage.getItem('token');
    //   console.log('Token from  localStorage',token);
      if (!token) {
        setError('No token found.');
        setLoading(false);
        return;
      }

      console.log('Fetched token from localStorage:', token); // Debugging log
      console.log('Fetched id from useParams:', id); // Debugging log

      try {
        const res = await axios.get(`http://localhost:5000/api/history/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        console.log('Response from API:', res); // Debugging log

        if (res.data) {
          console.log('Fetched data from API:', res.data); // Debugging log
          setItem(res.data);
        } else {
          setError('Item not found.');
        }
      } catch (err) {
        if (err.response) {
          setError(`Server responded with status: ${err.response.status}`);
        } else if (err.request) {
          setError('No response received from server.');
        } else {
          setError(`Error setting up request: ${err.message}`);
        }
        console.error('Error fetching item details:', err); // Debugging log
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="main-content">
      {error ? (
        <p>{error}</p>
      ) : item ? (
        <div>
          <h1>Details for Text ID: {item._id}</h1>
          <p><strong>Text:</strong> {item.text}</p>
          <div className="mt-4 w-3/4">
            <h2 className="text-2xl font-bold mb-2">Predictions:</h2>
            <table className="w-full bg-white border border-gray-300 rounded">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Label</th>
                  <th className="p-2 border">Prediction</th>
                  <th className="p-2 border">Toxicity (%)</th>
                </tr>
              </thead>
              <tbody>
                {item.predictions.map((prediction, index) => (
                  <tr key={index}>
                    <td className="p-2 border text-center">{prediction.label}</td>
                    <td className="p-2 border text-center">
                      {prediction.results[0].match ? 'Toxic' : 'Not Toxic'}
                    </td>
                    <td className="p-2 border text-center">
                      {(prediction.results[0].probabilities[1] * 100).toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p><strong>Timestamp:</strong> {new Date(item.timestamp).toLocaleString()}</p>
        </div>
      ) : (
        <p>Item not found.</p>
      )}
    </div>
  );
};

export default MainContentComponent;
