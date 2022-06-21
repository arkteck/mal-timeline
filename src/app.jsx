import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimelineChart from './timelineChart';
import VictoryTimeline from './victoryTimeline';

function App() {
  const [username, setUsername] = useState('arkteck');
  const [mal, setMal] = useState([]);
  const [drawChart, setDrawChart] = useState(false);

  const retrieveMal = () => {
    axios({
      url: `http://localhost:8325/username/${username}`,
      method: 'get',
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.status >= 400) {
          console.log('BAD REQUEST');
          setDrawChart(false);
        } else {
          const malData = response.data.filter((a) => (a.node.media_type === 'tv' && a.node.start_date));
          malData.sort((a, b) => (Date.parse(a.node.start_date) - Date.parse(b.node.start_date)));
          setMal(malData);
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
      {/* <TimelineChart mal={mal} drawChart={drawChart} /> */}
      <div style={{height: '800px', width: '1200px' }}>
        <VictoryTimeline mal={mal} drawChart={drawChart} />
      </div>
    </>
  );
}

export default App;
