import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'

function BreweryChart() {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.openbrewerydb.org/breweries')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        const breweryTypes = data.reduce((acc, brewery) => {
          acc[brewery.brewery_type] = (acc[brewery.brewery_type] || 0) + 1;
          return acc;
        }, {});

        setChartData({
          labels: Object.keys(breweryTypes),
          datasets: [
            {
              label: 'Brewery Types',
              data: Object.values(breweryTypes),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
            },
          ],
        });
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="chart-container">
      <h2>Brewery Types Distribution</h2>
      <Doughnut data={chartData} />
    </div>
  );
}

export default BreweryChart;