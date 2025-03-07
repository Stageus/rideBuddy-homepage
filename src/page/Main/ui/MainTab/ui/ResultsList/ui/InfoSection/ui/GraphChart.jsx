import React, { useEffect, useRef } from 'react';
import { useTheme } from 'styled-components';
import { Chart as ChartJS, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const GraphChart = ({ weather }) => {
  const theme = useTheme();
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // 기본 데이터 (weather가 없을 경우)
    const defaultData = Array(5).fill(0);
    const defaultLabels = ['0:00', '1:00', '2:00', '3:00', '4:00'];

    // weather 데이터가 있을 경우 동적 데이터 생성
    let labels = defaultLabels;
    let rainData = defaultData;

    if (weather) {
      // 현재 시간 기준으로 레이블 생성
      const currentTime = new Date(weather.dateTime);
      labels = Array.from({ length: 5 }, (_, i) => {
        const time = new Date(currentTime.getTime() + i * 60 * 60 * 1000);
        return `${time.getHours()}:00`;
      });

      // 강수량 데이터 추출
      rainData = [
        parseFloat(weather["0_rain"]) || 0,
        parseFloat(weather["1_rain"]) || 0,
        parseFloat(weather["2_rain"]) || 0,
        parseFloat(weather["3_rain"]) || 0,
        parseFloat(weather["4_rain"]) || 0,
      ];
    }

    const chartInstance = new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels, 
        datasets: [
          {
            label: '강수량',
            data: rainData, 
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
  }, [theme, weather]); 

  return <canvas ref={chartRef} width="320px" height="200px"></canvas>;
};

export default GraphChart;