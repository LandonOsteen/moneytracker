// LegislatorList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LegislatorCard from './LegislatorCard';
import './App.css';

const LegislatorList = ({ stateAbbreviation, onLegislatorClick }) => {
  const [legislators, setLegislators] = useState([]);

  useEffect(() => {
    const fetchLegislators = async () => {
      try {
        const apiKey = '09aeb7cde64dd3099d9006e148af6443';
        const response = await axios.get(
          `http://www.opensecrets.org/api/?method=getLegislators&id=${stateAbbreviation}&apikey=${apiKey}&output=json`
        );
        const legislatorsData = response.data.response.legislator;

        const mappedLegislators = legislatorsData.map(legislator => ({
          firstlast: legislator['@attributes'].firstlast,
          party: legislator['@attributes'].party,
          office: legislator['@attributes'].office,
          phone: legislator['@attributes'].phone,
          website: legislator['@attributes'].website,
          congress_office: legislator['@attributes'].congress_office,
          cid: legislator['@attributes'].cid
        }));

        setLegislators(mappedLegislators);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLegislators();
  }, [stateAbbreviation]);

  return (
    <div className="legislator-list-container">
      <h1>List of Legislators</h1>
      <h5>Here is a list of corresponding legislators for your selected State</h5>
      <div className="legislator-cards-container">
        {legislators.map((legislator, index) => (
          <LegislatorCard key={index} legislator={legislator} onLegislatorClick={onLegislatorClick} />
        ))}
      </div>
    </div>
  );
};

export default LegislatorList;
