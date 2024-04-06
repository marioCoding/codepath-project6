import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BreweryDetail() {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);

  useEffect(() => {
    fetch(`https://api.openbrewerydb.org/breweries/${id}`)
      .then(response => response.json())
      .then(data => setBrewery(data));
  }, [id]);

  if (!brewery) return <div>Loading...</div>;

  return (
    <div>
      <h2>{brewery.name}</h2>
      <p>Type: {brewery.brewery_type}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default BreweryDetail;