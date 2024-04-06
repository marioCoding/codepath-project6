import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BreweryList from './components/BreweryList';
import BreweryDetail from './components/BreweryDetail';
import BreweryChart from './components/BreweryChart';
import './index.css';

function App() {
  return (
    <Router>
      <div className="container">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/chart">View Chart</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<BreweryList />} />
        <Route path="/brewery/:id" element={<BreweryDetail />} />
        <Route path="/chart" element={<BreweryChart />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;