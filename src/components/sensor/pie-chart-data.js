export const pieChartData = {
  type: 'pie',
  data: {
    datasets: [{ // one line graph
      data: [1, 2, 3, 4],
      backgroundColor: [
        'rgba(0, 255, 0)',
        'rgba(0, 0, 255)', // Blue
        'rgba(255,0,0)',
        'rgba(255,255,0)'
      ],
      label: 'Dataset 1'
    }],
    labels: [
      'Green',
      'Blue',
      'Red',
      'Yellow'
    ]
  },
  options: {
    responsive: true
  }
}

export default pieChartData
