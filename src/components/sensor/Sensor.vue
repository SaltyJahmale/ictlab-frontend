<template>
    <div>
        <app-header></app-header>
        <div class='signup-form'>
            <div class='input'>
            <label for='name'>Name:</label>
            <input
                    type='text'
                    id='name'
                    v-model='name'>     
            </div>
            <div class='input'>
            <label for='topic'>Topic:</label>
            <input
                    type='text'
                    id='topic'
                    v-model='topic'>     
            </div>
            <div class='input'>
            <label for='ip'>Broker Ip:</label>
            <input
                    type='text'
                    id='ip'
                    v-model='ip'>
            </div>
            <div class='input'>
            <label for='port'>Broker Port:</label>
            <input
                    type='text'
                    id='port'
                    v-model='port'>
            </div>
            <div class='input'>
            <label for='sensorDataEnum'>Sensor Type:</label>
            <select v-model='sensorDataEnum'>
                <option disabled value=''>Please select one</option>
                <option>TEMP</option>
                <option>DENSITY</option>
                <option>PROXIMITY</option>
                <option>LIGHT</option>
                <option>PRESSURE</option>
            </select>
            </div>
            <div @click="onSubmit" class="submit">
                <button type="submit">Submit</button>
            </div>
        </div>
            <ul v-if='nodes && nodes.length'>
                <div v-for='node in nodes'>
                     <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Topic</th>
                            <th>Ip</th>
                            <th>Port</th>
                            <th>Connection Status</th>
                            <th>Sensor status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{{node.name}}</td>
                            <td>{{node.topic}}</td>
                            <td>{{node.ip}}</td>
                            <td>{{node.port}}</td>
                            <td>{{node.connectionStatus}}</td>
                            <td>{{node.sensorNodeStatus}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </ul>
            <!-- <ul v-if='errors && errors.length'>
                <li v-for='error in errors'>
                    {{error.message}}
                </li>
            </ul> -->
        <app-line-chart></app-line-chart>
        <canvas id="chart"></canvas>
        <button @click="addMore">asdasdas</button>
    </div>
</template>

<script>
import Header from "../Header.vue";
import LineChart from "./LineChart.vue";
import PieChart from "./PieChart.vue";
import axios from "axios";
import planetChartData from "./line-chart-data.js";

export default {
  data() {
    return {
      planetChartData: planetChartData,
      nodes: [],
      errors: [],
      db_items: [],
      interval: null,
      name: "",
      connectionStatus: "DISCONNECTED",
      ip: "",
      port: "",
      sensorDataEnum: "",
      sensorNodeStatus: "OK",
      topic: ""
    };
  },
  methods: {
      addMore() {
          planetChartData.push(20);
      },
    onSubmit() {
      console.log(sensorNode);
      const token = localStorage.getItem("TOKEN_KEY");
      axios.post("/sensornodes",
          {
            name: this.name,
            connectionStatus: this.connectionStatus,
            ip: this.ip,
            port: this.port,
            sensorDataEnum: this.sensorDataEnum,
            sensorNodeStatus: this.sensorNodeStatus,
            topic: this.topic
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    loadData: function (res) {
        axios.get('', function (res) {
            this.db_items = res.data
        }.bind(this))
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  },
  ready: function () {
      this.loadData();

      this.interval = setInterval(function () {
          this.loadData();
      }.bind(this), 30000) 
  },
  components: {
    appHeader: Header,
    appLineChart: LineChart,
    appPieChart: PieChart
  },
  created() {
    const token = localStorage.getItem("TOKEN_KEY");

    axios
      .get("/sensornodes", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        this.nodes = res.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  beforeDestroy: function() {
      clearInterval(this.interval);
  },
  mounted() {
      this.createChart("chart", this.planetChartData);
  }
  
};
</script>

<style>
.signup-form {
  width: 400px;
  margin: 30px auto;
  /* border: 1px solid #eee; */
  /* padding: 20px; */
  /* box-shadow: 0 2px 3px #ccc; */
}

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input.inline label {
  display: inline;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input.inline input {
  width: auto;
}

.input input:focus {
  outline: none;
  border: 1px solid #521751;
  background-color: #eee;
}

.input select {
  border: 1px solid #ccc;
  font: inherit;
}

.hobbies button {
  border: 1px solid #521751;
  background: #521751;
  color: white;
  padding: 6px;
  font: inherit;
  cursor: pointer;
}

.hobbies button:hover,
.hobbies button:active {
  background-color: #8d4288;
}

.hobbies input {
  width: 90%;
}

.submit button {
  border: 1px solid #521751;
  color: #521751;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #521751;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}
</style>
