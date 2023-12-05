import React from 'react';
import './App.css';

const LegislatorCard = ({ legislator, onLegislatorClick }) => {
  const {
    firstlast,
    party,
    office,
    phone,
    website,
    congress_office,
    cid
  } = legislator;

  const handleCardClick = () => {
    onLegislatorClick(cid);
  };

  function restOfParty(partyInitial){
    if (partyInitial === 'D'){
      return 'Democratic';
    }

    if (partyInitial === 'R'){
      return 'Republican';
    }
  }

  let fullPartyName = restOfParty(party)

  return (
    <div className="legislator-card" onClick={handleCardClick}>
      <h2>{firstlast}</h2>
      <h3><strong>Party: </strong>{fullPartyName}</h3>
      <h3><strong>Office: </strong>{office}</h3>
      <h3><strong>Phone: </strong>{phone}</h3>
      <h3><strong>Website: </strong>{website}</h3>
      <h3><strong>Congress Office: </strong>{congress_office}</h3>
      <h3><strong>CID: </strong>{cid}</h3>
    </div>
  );
};

export default LegislatorCard;
