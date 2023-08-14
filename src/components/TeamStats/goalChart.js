import React, { PureComponent } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Utility function to format the minute data for the bar chart
const formatChartData = (data) => {
  return Object.keys(data).map((minute) => ({
    name: minute,
    total: data[minute].total,
  }));
};

export default class Graph extends PureComponent {
  render() {
    const { goalData } = this.props;

    // Extracting the "for" and "against" minute data from the goalData prop
    const forData = goalData.for.minute;
    const againstData = goalData.against.minute;

    // Format the "for" and "against" minute data for the bar chart
    const formattedForData = formatChartData(forData);
    const formattedAgainstData = formatChartData(againstData);

    return (
      <div>
        <h2>Goals For</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={formattedForData} // Use the formatted "for" minute data here
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <h2>Goals Against</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={formattedAgainstData} // Use the formatted "against" minute data here
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
