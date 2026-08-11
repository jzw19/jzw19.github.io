import React from 'react';
import Plot from 'react-plotly.js';

const DataVisualization: React.FC = () => {
  // Simple scatter plot data
  const data = [
    {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'rgb(55, 128, 191)' },
    },
  ];

  const layout = {
    title: 'Sample Plotly Chart',
    width: 600,
    height: 400,
    margin: { l: 40, r: 40, t: 40, b: 40 },
  };

  return (
    <div>
      <h2>Data Visualization</h2>
      <Plot data={data} layout={layout} />
    </div>
  );
};

export default DataVisualization;