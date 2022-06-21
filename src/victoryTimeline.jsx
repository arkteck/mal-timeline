import React, { useState, useEffect } from 'react';
import * as V from 'victory';

function VictoryTimeline({ mal, drawChart }) {
  const [data, setData] = useState({});
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const labels2 = [];
    const data2 = [];
    let minDate = Date.now();
    let maxDate = Date.now();
    mal.forEach((anime) => {
      labels2.push(anime.node.title);
      const startDate = new Date(anime.node.start_date);
      const endDate = anime.node.end_date ? new Date(anime.node.end_date) : Date.now();
      if (startDate < minDate) {
        minDate = startDate;
      }
      if (endDate > maxDate) {
        maxDate = endDate;
      }
      data2.unshift({
        x: anime.node.title,
        y0: startDate,
        y: endDate,
        // label: anime.node.title,
      });
    });
    setData(data2);
    setLabels(labels2);
  }, [mal]);

  if (drawChart) {
    return (
      <V.VictoryChart
        scale={{ y: 'time' }}
        horizontal
        containerComponent={<V.VictoryZoomContainer />}
      >
        <V.VictoryBar
          data={data}
        />
        <V.VictoryAxis dependentAxis />
      </V.VictoryChart>
    );
  }
  return null;
}

export default VictoryTimeline;
