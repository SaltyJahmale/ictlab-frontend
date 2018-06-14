<template>
    <div>
        <canvas id="planet-chart"></canvas>
    </div>
</template>

<script>
import Chart from "chart.js";
import planetChartData from "./line-chart-data.js";

export default {
  data() {
    return {
      planetChartData: planetChartData
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
    this.createChart("planet-chart", this.planetChartData);
  }
};
</script>

<style>
</style>
