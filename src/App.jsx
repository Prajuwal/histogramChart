import "./App.css";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const HistogramChart = ({ arrayObj }) => {
  return (
    <div className="histogram-container">
      <ResponsiveContainer width="80%" height={300}>
        <BarChart data={arrayObj}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="number" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ fontSize: 12 }} />
          <Bar dataKey="frequency" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const Computation = ({ dataArray }) => {
  const frequencyObject = dataArray.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});
  const data = Object.entries(frequencyObject).map(([number, frequency]) => ({
    number: parseInt(number),
    frequency: frequency,
  }));
  return <HistogramChart arrayObj={data} />;
};

const HistogramData = () => {
  const [numbers, setNumbers] = useState([]);
  const fetchData = async () => {
    const response = await fetch(
      "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new"
    );
    const data = await response.text();
    const numbersArray = data
      .split("")
      .filter((nums) => nums !== "\n")
      .map((val) => parseInt(val));
    setNumbers(numbersArray);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <Computation dataArray={numbers} />;
};

export default function App() {
  return <HistogramData />;
}
