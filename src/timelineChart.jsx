import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Zoom from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';

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
    zoom: {
      limits: {
        x: { min: 'original', max: 'original' },
        y: { min: 'original', max: 'original' },
      },
      pan: { enabled: true, mode: 'xy', threshold: 10 },
      zoom: {
        mode: 'xy',
        wheel: {
          enabled: true,
        },
      },
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: ({ raw }) => (`${raw[0]} - ${raw[1]}`),
      },
    },
  },
  scales: {
  },
};

const today = new Date();
const todayString = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate()}`;

function AnimeEntry({ mal, drawChart }) {
  const [data, setData] = useState({});

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Zoom,
    TimeScale,
  );

  useEffect(() => {
    const labels = [];
    const data2 = [];
    let minDate = Date.now();
    let maxDate = Date.now();
    mal.forEach((anime) => {
      labels.push(anime.node.title);
      const startDate = new Date(anime.node.start_date);
      const endDate = anime.node.end_date ? new Date(anime.node.end_date) : Date.now();
      if (startDate < minDate) {
        minDate = startDate;
      }
      if (endDate > maxDate) {
        maxDate = endDate;
      }
      data2.push([anime.node.start_date, anime.node.end_date ? anime.node.end_date : todayString]);
    });
    options.scales = {
      x: {
        type: 'time',
        min: minDate,
        max: maxDate,
      },
    };
    setData({
      labels,
      datasets: [
        {
          label: 'anime',
          data: data2,
          backgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor: 'rgb(255, 99, 132)',
        },
      ],
    });
  }, [mal]);

  return (
    <>
      <div>
        {Object.keys(data).length}
      </div>
      {drawChart ? (
        <Bar
          data={data}
          options={options}
        />
      ) : null}
    </>
  );
}

export default AnimeEntry;
