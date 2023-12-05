import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import LegislatorList from './LegislatorList';
import PersonalFinanceCard from './PersonalFinanceCard'; // Include the new component

const App = () => {
  const [currentState, setCurrentState] = useState(null);
  const [selectedLegislator, setSelectedLegislator] = useState(null);

  const handleStateClick = (stateAbbreviation) => {
    setCurrentState(stateAbbreviation);
  };

  const handleLegislatorClick = (cid) => {
    setSelectedLegislator(cid);
  };


  const stateAbbreviationsArr = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
  

  const renderLegislatorList = () => {
    return (
      <div>
        <h1>State List</h1>
        <h5>Choose a state to display a list of active legislators</h5>
        <div className="state-cards-container">
          {stateAbbreviationsArr.map(state => (
            <div key={state} onClick={() => handleStateClick(state)} className="state-card">
              <div className="state-card-content">
                <h2>{state}</h2>
              </div>
            </div>
          ))}
        </div>
        <LegislatorList
          stateAbbreviation={currentState}
          onLegislatorClick={handleLegislatorClick}
        />
      </div>
    );
  };

  const renderPersonalFinanceCard = () => {
    if (selectedLegislator) {
      return (
        <PersonalFinanceCard
          cid={selectedLegislator}
          onClose={() => setSelectedLegislator(null)}
        />
      );
    }
    return null;
  };

  return (
    <div>
      {currentState ? (
        <div>
          {renderPersonalFinanceCard()}
          {renderLegislatorList()}
        </div>
      ) : (
        renderLegislatorList()
      )}
    </div>
  );
};

export default App;


