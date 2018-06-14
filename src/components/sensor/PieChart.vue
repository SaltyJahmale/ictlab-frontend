<template>
    <div>
        <canvas id="pie-chart"></canvas>
    </div>
</template>

<script>
import Chart from "chart.js";
import pieChartData from "./pie-chart-data.js";

export default {
  data() {
    return {
      pieChartData: pieChartData
    };
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  },
  mounted() {
    this.createChart("pie-chart", this.pieChartData);
  }
};
</script>

<style>
</style>