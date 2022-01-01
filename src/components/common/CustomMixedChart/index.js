import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  ChartDataLabels
);

// ChartJS.defaults.plugins

const constants = {
  baseline: 2.5,
  goal: 4.5,
  numberOfWeeks: 14,
};

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 5,
      ticks: {
        stepSize: 0.5,
      },
      title: {
        display: true,
        text: "Performance",
      },
    },
    x: {
      type: "linear",
      ticks: {
        // forces step size to be 1 unit
        stepSize: 1,
      },
      title: {
        display: true,
        text: "Weeks",
      },
    },
    x1: {
      min: 0,
      type: "linear",
      max: 90,
      title: {
        display: true,
        text: "Days",
      },
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
      ticks: {
        stepSize: 1,
      },
    },
  },
  elements: {
    line: {
      fill: false,
      point: {
        radius: 0,
      },
    },
  },
  plugins: {
    datalabels: {
      color: "#36A2EB",
    },
    legend: {
      display: false,
    },
  },
};

// export const options = {
//   responsive: true,
//   scales: {
//     y: {
//       beginAtZero: true,
//       min: 0,
//       max: 5,
//       ticks: {
//         stepSize: 0.5,
//       },
//       title: {
//         display: true,
//         text: "Performance",
//       },
//     },
//     x: {
//       type: "linear",
//       ticks: {
//         // forces step size to be 1 unit
//         stepSize: 1,
//       },
//       title: {
//         display: true,
//         text: "Weeks",
//       },
//     },
//     x1: {
//       min: 0,
//       type: "linear",
//       max: 90,
//       title: {
//         display: true,
//         text: "Days",
//       },
//       grid: {
//         drawOnChartArea: false, // only want the grid lines for one axis to show up
//       },
//       ticks: {
//         stepSize: 1,
//         //   maxTicksLimit: 90,
//       },
//     },
//     // x: {
//     //   beginAtZero: true,
//     //   min: 1,
//     //   max: 90,
//     // },
//   },
//   elements: {
//     line: {
//       fill: false,
//       point: {
//         radius: 0,
//       },
//       //   backgroundColor: getLineColor,
//       //   borderColor: getLineColor,
//     },
//     point: {
//       //   radius: 0, // to hide points for base line
//     },
//   },
//   plugins: {
//     legend: false,
//   },
//   animation: {
//     duration: 1,
//     onComplete: function () {
//       var chartInstance = this.chart,
//         ctx = chartInstance.ctx;
//       ctx.textAlign = "center";
//       ctx.textBaseline = "bottom";

//       this.data.datasets.forEach(function (dataset, i) {
//         var meta = chartInstance.controller.getDatasetMeta(i);
//         meta.data.forEach(function (bar, index) {
//           var data = dataset.data[index];
//           ctx.fillText(data, bar._model.x, bar._model.y - 5);
//         });
//       });
//     },
//   },
// };

const labels = Array(constants.numberOfWeeks)
  .fill(0)
  .map((_, index) => index);

const getLineChartDataWithLimits = () => {
  let temp = constants.baseline;
  return labels.map((_, index) => {
    temp =
      temp + (constants.goal - constants.baseline) / constants.numberOfWeeks;
    if (index === 0) {
      return constants.baseline;
    }
    return temp;
  });
};

// week start from 0 to 6
// days start form 1 to 7
const getWeekAndDayValue = (week, day) => {
  return week + day / 7;
};

console.log(labels);

export const data = {
  //   labels: labels.slice(0, labels.length - 1),
  labels: labels,
  datasets: [
    {
      type: "line",
      label: "Dataset 1",
      borderColor: "rgb(255, 99, 132)",
      fill: true,
      data: getLineChartDataWithLimits(),
      borderDash: [15, 15],
      pointRadius: 0,
      datalabels: {
        display: false,
      },
    },
    {
      type: "scatter",
      label: "Dataset 2",
      backgroundColor: "rgb(75, 192, 192)",
      data: [
        {
          x: getWeekAndDayValue(0, 2), // 2nd day of 1st week
          y: 2.2,
        },
        {
          x: getWeekAndDayValue(2, 5), // 5th day of 3rd week
          y: 3.6,
        },
        {
          x: getWeekAndDayValue(3, 7), // 7th day of 4th week
          y: 4.5,
        },
      ],
      datalabels: {
        color: "blue",
        anchor: "end",
        align: "bottom",
        formatter: function (value, context) {
          return value.y;
        },
      },
      borderColor: "blue",
      borderWidth: 2,
    },
  ],
};

export function CustomMixedChart() {
  return <Chart type="scatter" data={data} options={options} />;
}
