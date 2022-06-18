import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimelineChart from './timelineChart.jsx';

function App() {
  const [username, setUsername] = useState('');
  const [mal, setMal] = useState([]);
  const [drawChart, setDrawChart] = useState(false);

  const retrieveMal = () => {
    axios({
      url: `http://localhost:8325/username/${username}`,
      method: 'get',
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 403) {
          console.log('BAD REQUEST');
          setDrawChart(false);
        } else {
          setMal(response.data);
          setDrawChart(true);
        }
      })
      .catch((err) => {
        console.log('retrieveMal error', err);
      });
  };

  return (
    <>
      <input
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="Search this user"
      />
      <button
        type="button"
        onClick={retrieveMal}
      >
        Click!
      </button>
      <br />
      <TimelineChart mal={mal} drawChart={drawChart} />
    </>
  );
}

export default App;
