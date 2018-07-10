export const planetChartData = {
  type: 'line',
  data: {
    labels: ['2018-06-28 10:00:00.00', '2018-06-28 10:30:00.00', '2018-06-28 11:00:00.00', '2018-06-28 11:30:00.00', '2018-06-28 12:00:00.00', '2018-06-28 12:30:00.00', '2018-06-28 13:00:00.00', '2018-06-28 13:30:00.00'],
    datasets: [
      { // one line graph
        label: 'TEMP Sensor room 4312',
        data: [0, 0, 18, 20, 20, 21, 21, 17],
        backgroundColor: [
          'rgba(54,73,93,.5)', // Blue
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)',
          'rgba(54,73,93,.5)'
        ],
        borderColor: [
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d',
          '#36495d'
        ],
        borderWidth: 3
      },
      { // another line graph
        label: 'TEMP Sensor room 1234',
        data: [17, 17, 16, 16, 18, 18, 17, 17],
        backgroundColor: [
          'rgba(71, 183,132,.5)' // Green
        ],
        borderColor: [
          '#47b784'
        ],
        borderWidth: 3
      }
    ]
  },
  options: {
    responsive: true,
    lineTension: 1,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          padding: 25
        }
      }]
    }
  }
}

export default planetChartData
