import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BreweryList() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.openbrewerydb.org/v1/breweries');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // Filtered data based on search term and filters
  const filteredData = data.filter(item => {
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTypeFilter = typeFilter === 'all' || item.brewery_type === typeFilter;
    const matchesStateFilter = stateFilter === 'all' || item.state === stateFilter;
    const matchesCityFilter = cityFilter === '' || item.city.toLowerCase().includes(cityFilter.toLowerCase());

    return matchesSearchTerm && matchesTypeFilter && matchesStateFilter && matchesCityFilter;
  });

  return (
    <div>
      <h1>Brewery Dashboard</h1>

      {/* Search bar */}
      <input type="text" placeholder="Search..." onChange={e => setSearchTerm(e.target.value)} />

      {/* Type filter dropdown */}
      <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
        <option value="all">All Types</option>
        <option value="brewpub">Brewpub</option>
        <option value="micro">Micro</option>
        <option value="large">Large</option>
      </select>

      {/* State filter dropdown */}
      <select value={stateFilter} onChange={e => setStateFilter(e.target.value)}>
        <option value="all">All States</option>
        <option value="California">California</option>
        <option value="Texas">Texas</option>
        {/* Add more state options if needed */}
      </select>

      {/* City filter input */}
      <input type="text" placeholder="Enter City..." value={cityFilter} onChange={e => setCityFilter(e.target.value)} />

      {/* Data list */}
      <ul>
        {filteredData.map(item => (
          <li key={item.id}>
            <Link to={`/brewery/${item.id}`}>
              <strong>{item.name}</strong>
            </Link>
            <p>Type: {item.brewery_type}</p>
            <p>State: {item.state}</p>
            <p>City: {item.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BreweryList;