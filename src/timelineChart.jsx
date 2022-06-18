import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
  scales: {
  },
};

function AnimeEntry({ mal, drawChart }) {
  const [data, setData] = useState({});

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  useEffect(() => {
    const labels = [];
    const data2 = [];
    let minDate = Date.now();
    mal.forEach((anime) => {
      labels.push(anime.node.title);
      const startDate = Date.parse(anime.node.start_date);
      if (startDate < minDate) {
        minDate = startDate;
      }
      data2.push([startDate, Date.parse(anime.node.end_date)]);
    });
    options.scales = {
      x: {
        min: minDate * 0.99,
      },
    };
    setData({
      labels,
      datasets: [
        {
          label: 'anime',
          data: data2,
          backgroundColor: 'rgba(255, 99, 132, .8)',
          borderColor: 'rgb(255, 99, 132)',
        },
      ],
    });
  }, [mal]);

  return (<>
    <div>
      {Object.keys(data).length}
    </div>
    {drawChart ? <Bar
      data={data}
      options={options}
    /> : null}
  </>

  );
}

export default AnimeEntry;
