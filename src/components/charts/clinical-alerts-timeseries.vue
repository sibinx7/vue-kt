<template>
  <div class="clinical-alerts-time-series-wrapper">
    <div class="clinical-alerts-time-series">
      <div id="clinical-alerts-elememt" 
      ref="clinicalAlertsTimeSeries" 
      class="chart-component"></div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import * as echarts from 'echarts/core';
import {
  GridComponent,
  VisualMapComponent,
  MarkLineComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import moment from "moment";

import useReportStore from "../../stores/report";
const reportStore = useReportStore();
const clinicalAlerts = reportStore.clinicalAlerts;
const clinicalAlertsChartData = clinicalAlerts['clinical-alerts'];
const clinicalAlertsTableData = clinicalAlerts['table-value'];

const clinicalAlertsTimeSeries = ref(null);

// debugger
const chartSeriesData = ref([]);
const chartPieceData = ref([]);

echarts.use([
  GridComponent,
  VisualMapComponent,
  MarkLineComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);



const setChartOptions = () => {
  const clinicalAlertElement = clinicalAlertsTimeSeries.value;
  const clinicalAlertChart = echarts.init(clinicalAlertElement);

  const seriesData = chartSeriesData.value.map((item) => {
      const time = new Date(item.AlertDate);
      // const name = item.Parameters
      return [
        moment(time,'x').format('X') 
  ] 
          // return {
          //   name,
          //   value: time 
          // }
        })
  const option = {
    xAxis: [{
      type: 'category',
      splitNumber: 10,
      axisLine: {
        lineStyle: {
          width: 3 
        }
      }
    },
    {
      type: 'category',
      splitNumber: 10,
      axisLine: {
        lineStyle: {
          width: 3 
        }
      }
    }
    ],
    yAxis: {
      show: false 
    },
    visualMap: {
      type: 'piecewise',
      show: false,
      dimension: 0,
      seriesIndex: 0,
      pieces: [
        {
          gt:1, lt: 3
        },
        {
          gt: 4, lt: 5
        }
      ] 
    },
    series: [
      {
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: 'transparent',
          width: 1
        },
        areaStyle: {},
        data: [
          
        ]
      }
    ]
  };

  console.log('--- START ---')
  console.log(chartPieceData.value)
  console.log(seriesData)
  console.log('--- END ---')
  clinicalAlertChart.setOption(option)
}

const convertToPieceData = () => {
  chartPieceData.value = clinicalAlertsChartData.map((item) => {
    return {
      min: moment(item.start, 'X').format(),
      max: moment(item.end, 'X').format(),
      label: "XXX",
      color: 'red'
    }
  })
}

const convertToTableData = () => {
  chartSeriesData.value = clinicalAlertsTableData.map((item) => {
    // const alertStartTimeWithDate;
    // const alertEndTimeWithDate;
    return {
      AlertStartTime: item['Alert-startTime'],
      AlertEndTime: item['Alert-endTime'],
      AlertDate: item['Alert-Date'],
      Priority: item['Priority'],
      Parameters: item['Parameters'],
      Value: item.Value,
      Acknowledged: item.Acknowledged,
      ActionTaken: item['Action-Taken']
    }
  }).sort((a, b) => {
    const aAlertStartTime =  moment(a.AlertStartTime, 'HH::mm').format('x');
    const bAlertStartTime = moment(b.AlertStartTime, 'HH::mm').format('x');
    return bAlertStartTime - aAlertStartTime;
  });
}

onMounted(() => {

  convertToPieceData();
  convertToTableData();

  setChartOptions();
})

onUnmounted(() => {
  console.log('Hello')
})
</script>
<style lang="scss" scoped>
  #clinical-alerts-elememt{
    width: 100%;
    height: 200px;
  }
</style>