// PersonalFinanceCard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const PersonalFinanceCard = ({ cid, onClose, candidateName }) => {
  const [topDonors, setTopDonors] = useState(null);

  useEffect(() => {
    const fetchTopDonors = async () => {
      try {
        const apiKey = '09aeb7cde64dd3099d9006e148af6443';
        const response = await axios.get(
          `https://www.opensecrets.org/api/?method=candContrib&cid=${cid}&output=json&apikey=${apiKey}`
        );

        if (
          response.data &&
          response.data.response &&
          response.data.response.contributors &&
          response.data.response.contributors.contributor
        ) {
          setTopDonors(response.data.response.contributors.contributor);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopDonors();
  }, [cid]);

  return (
    <div className={`personal-finance-drawer ${topDonors ? 'open' : ''}`}>
      <div className="drawer-header">
        <h2>{`Top Donors`}</h2>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
      <div className="drawer-content">
        {topDonors ? (
          <div>
            {topDonors['@attributes'] && topDonors['@attributes'].cand_name && (
              <h3 className="sub-title">for {topDonors['@attributes'].cand_name}</h3>
            )}
            {topDonors['@attributes'] && topDonors['@attributes'].notice && (
              <p className="notice">Notice: {topDonors['@attributes'].notice}</p>
            )}
            <ul className="donors-list">
              {Array.isArray(topDonors) &&
                topDonors.map((donor, index) => (
                  <li key={index} className="donor-item">
                    <hr />
                    <strong>
                      <donorName>{donor['@attributes'].org_name}</donorName>
                      <br />
                      <contribution>Contribution Total: <donorTotal>${donor['@attributes'].total}</donorTotal></contribution>
                    </strong>
                    <br />
                    <donorDetails>PACs: ${donor['@attributes'].pacs}</donorDetails>
                    <br />
                    <donorDetails>Individuals: ${donor['@attributes'].indivs}</donorDetails>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <p>Loading top donors...</p>
        )}
      </div>
    </div>
  );
};

export default PersonalFinanceCard;
