import { Chart, LineController, LinearScale, CategoryScale, Line, Point, Rectangle, Legend } from 'chart.js'
import { color } from 'chart.js/helpers'
import MyType from './boxplot'
import BoxPlotController from './src/controllers/controller.boxplot'
import ViolinController from './src/controllers/controller.violin'
import BoxPlotElement from './src/elements/element.boxplot'
import ViolinElement from './src/elements/element.violin'
import BoxPlotScale from './src/scale/scale.arraylinear'
import * as d3 from 'd3-random'
import './utils'

Chart.register(
  BoxPlotScale, 
  MyType, 
  LineController, 
  LinearScale, 
  Line, 
  Point, 
  CategoryScale, 
  BoxPlotController, 
  BoxPlotElement, 
  Rectangle, 
  Legend, 
  ViolinController, 
  ViolinElement
)

window.onload = () => {
const ctx = (document.getElementById('chart') as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
// const myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// })

// const myChart = new Chart(ctx, {
//     type: 'MyType',
//     data: {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//         datasets: [{
//             label: 'My First dataset',
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: [0, 10]
//         }]
//     },
//     options: {
//         tooltips: {
//             mode: 'point'
//         },
//         responsive: true,
//         elements: {
//           point: {
//             hitRadius: 2,
//             radius: 2
//           }
//         }
//     }
// })
function randomValues(count, min, max) {
  const delta = max - min;
  return Array.from({length: count}).map(() => Math.random() * delta + min);
}
// const boxplotData = {
//   labels: ['A', 'B', 'C'],
//   datasets: [{
//     label: 'Dataset 1',
//     borderColor: 'red',
//     borderWidth: 1,
//     outlierRadius: 3,
//     itemRadius: 3,
//     outlierColor: '#999999',
//     data: [
//       [1,2,3,4],
//       [5,6,7,8]
//     ],
//   }]
// };
// const myChart = new Chart(ctx, {
//   type: 'boxplot',
//   data: boxplotData,
//   options: {
//     responsive: true,
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Box Plot Chart'
//     },
//     // scales: {
//     //   xAxes: [{
//     //     // Specific to Bar Controller
//     //     categoryPercentage: 0.9,
//     //     barPercentage: 0.8
//     //   }]
//     // }
//   }
// })

// example - 2
// const boxplotData = {
//   labels: ['A', 'B'],
//   datasets: [{
//     label: 'Dataset 1',
//     borderColor: 'red',
//     borderWidth: 1,
//     outlierRadius: 3,
//     itemRadius: 3,
//     outlierColor: '#999999',
//     data: [
//       randomValues(100, 1, 9).concat([14, 16, 0]),
//       randomValues(100, 0, 10)
//     ],
//   }]
// };
// const myChart = new Chart(ctx, {
//   type: 'boxplot',
//   data: boxplotData,
//   options: {
//     responsive: true,
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Box Plot Chart'
//     },
//     scales: {
//       xAxes: [{
//         // Specific to Bar Controller
//         categoryPercentage: 0.9,
//         barPercentage: 0.8
//       }]
//     }
//   }
// });
// setTimeout(function() {
//   const vs = boxplotData.datasets[0].data[0];
//   boxplotData.datasets[0].data[0] = randomValues(100, 4, 19);
//   myChart.update();
// }, 2000);
// console.log(myChart)
// example - 3

// const samples = window.Samples.utils;
// console.log(d3)
// var b = d3.randomNormal();
//   var random = (min, max) => () => (b() * ((max || 1) - (min || 0))) + (min || 0);
//   var boxplotData = {
//     labels: samples.months({count: 7}),
//     datasets: [{
//       label: 'Dataset 1',
//       backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
//       borderColor: window.chartColors.red,
//       borderWidth: 1,
//       data: samples.boxplots({count: 7, random: random}),
//       outlierColor: '#999999'
//     }, {
//       label: 'Dataset 2',
//       backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
//       borderColor: window.chartColors.blue,
//       borderWidth: 1,
//       data: samples.boxplotsArray({count: 7, random: random}),
//       outlierColor: '#999999'
//     }]

//   };
// const myBar = new Chart(ctx, {
//   type: 'boxplot',
//   data: boxplotData,
//   options: {
//     responsive: true,
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Box Plot Chart'
//     },
//     scales: {
//       xAxes: [{
//         // Specific to Bar Controller
//         categoryPercentage: 0.9,
//         barPercentage: 0.8
//       }]
//     }
//   }
// });
const samples = window.Samples.utils;
var b = d3.randomNormal();
var random = (min, max) => () => (b() * ((max || 1) - (min || 0))) + (min || 0);
var boxplotData = {
  labels: samples.months({count: 7}),
  datasets: [{
    label: 'Dataset 1',
    backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
    borderColor: window.chartColors.red,
    borderWidth: 1,
    data: samples.boxplotsArray({count: 7, random: random})
  }, {
    label: 'Dataset 2',
    backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
    borderColor: window.chartColors.blue,
    borderWidth: 1,
    data: samples.boxplotsArray({count: 7, random: random})
  }]

};
const myBar = new Chart(ctx, {
  type: 'violin',
  data: boxplotData,
  options: {
    responsive: true,
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Violin Chart'
    },
    tooltipDecimals: 3
  }
});
console.log(myBar)
// window.addEventListener('resize', () => {
//     myChart.resize()
// })
}
