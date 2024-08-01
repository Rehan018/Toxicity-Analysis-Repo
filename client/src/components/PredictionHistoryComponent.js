// PredictionHistoryComponent.js
import React from 'react';
import '../styles.css';

const PredictionHistoryComponent = ({ history }) => {
  return (
    <div className="mt-4 w-3/4">
      <h2 className="text-2xl font-bold mb-2">Prediction History:</h2>
      <table className="w-full bg-white border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Input Text</th>
            <th className="p-2 border">Label</th>
            <th className="p-2 border">Prediction</th>
            <th className="p-2 border">Toxicity (%)</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) =>
            item.predictions.map((prediction, pIndex) => (
              <tr key={`${index}-${pIndex}`}>
                {pIndex === 0 && (
                  <td rowSpan={item.predictions.length} className="p-2 text-center border">
                    {item.input}
                  </td>
                )}
                <td className="p-2 border text-center">{prediction.label}</td>
                <td className="p-2 border text-center">
                  {prediction.results[0].match ? 'Toxic' : 'Not Toxic'}
                </td>
                <td className="p-2 border text-center">
                  {(prediction.results[0].probabilities[1] * 100).toFixed(2)}%
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionHistoryComponent;
