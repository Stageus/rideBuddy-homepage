// GraphChart.jsx
import React, { useEffect, useRef } from 'react';
import { useTheme } from 'styled-components';
import { Chart as ChartJS, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const GraphChart = () => {
  const theme = useTheme(); // styled-components의 테마 사용

  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chartInstance = new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels: [
          '0:00',
          '1:00',
          '2:00',
          '3:00',
          '4:00',
          '5:00',
          '6:00',
          '7:00',
          '8:00',
          '9:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
          '22:00',
          '23:00',
        ],
        datasets: [
          {
            label: '강수량',
            data: [50, 75, 30, 60, 90, 55, 80, 70, 65, 85, 90, 40, 30, 70, 60, 20, 50, 10, 90, 70, 60, 40, 30, 50],
            backgroundColor: theme.colors.primary30,
            borderColor: theme.colors.primary10,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: theme.colors.primary60,
              font: {
                size: parseInt(theme.fontSizes.bodyM),
                family: theme.fonts.body,
                weight: theme.fontWeights.medium,
              },
            },
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: context => `${context.dataset.label}: ${context.raw} mm`,
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              color: theme.colors.primary10,
            },
            ticks: {
              color: theme.colors.primary30,
              font: {
                size: parseInt(theme.fontSizes.bodyXS),
                family: theme.fonts.body,
              },
            },
          },
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: theme.colors.primary10,
            },
            ticks: {
              color: theme.colors.primary30,
              font: {
                size: parseInt(theme.fontSizes.bodyS),
                family: theme.fonts.body,
              },
            },
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [theme]);

  return <canvas ref={chartRef} width="320px" height="200px"></canvas>;
};

export default GraphChart;
