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
  };

  useEffect(() => {
    const labels = [];
    mal.forEach((anime) => {
      labels.push(anime.node.title);
    });
    setData({
      labels,
      datasets: [
        {
          label: 'anime',
          data: mal.map((anime) => (
            Math.floor(Math.random() * 1000)
          )),
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
      width={100}
      height={50}
    /> : null}
  </>

  );
}

export default AnimeEntry;
