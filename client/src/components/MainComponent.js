import React, { useState } from 'react';
import HeaderComponent from './HeaderComponent';
import SidebarComponent from './SidebarComponent';
import MainContentComponent from './MainContentComponent';
import ClassifyInputComponent from './ClassifyInputComponent';
import PredictionHistoryComponent from './PredictionHistoryComponent';

const MainComponent = () => {
  const [selectedPrediction, setSelectedPrediction] = useState(null);

  return (
    <div>
      <HeaderComponent />
      <div style={{ display: 'flex' }}>
        <SidebarComponent setSelectedPrediction={setSelectedPrediction} />
        <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
          <MainContentComponent selectedPrediction={selectedPrediction} />
          <ClassifyInputComponent setSelectedPrediction={setSelectedPrediction} />
          {selectedPrediction && <PredictionHistoryComponent history={[selectedPrediction]} />}
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
