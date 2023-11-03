<template>
  <div class="clinical-alerts-time-series-wrapper">
    <div class="clinical-alerts-time-series">
      <div
        id="clinical-alerts-elememt"
        ref="clinicalAlertsTimeSeries"
        class="chart-component"
      ></div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import {
  GridComponent,
  VisualMapComponent,
  MarkLineComponent,
  MarkAreaComponent,
  DataZoomComponent,
  DatasetComponent
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import moment from 'moment'

import useReportStore from '../../stores/report'
const reportStore = useReportStore()
const clinicalAlerts = reportStore.clinicalAlerts


const clinicalAlertsTimeSeries = ref(null)

// debugger
const chartSeriesData = ref([])
const chartPieceData = ref([])

echarts.use([
  GridComponent,
  VisualMapComponent,
  MarkLineComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  MarkAreaComponent,
  DataZoomComponent,
  DatasetComponent
])

const setChartOptions = () => {
  const clinicalAlertElement = clinicalAlertsTimeSeries.value
  const clinicalAlertChart = echarts.init(clinicalAlertElement)

  const seriesData = chartSeriesData.value.map((item) => {
    // debugger 
    const timeStart = moment(
      `${item['AlertDate']} ${item['AlertStartTime']}`,
      'DD-MMM-YYYY HH:mm'
    ).format('X')
    const timeEnd = moment(
      `${item['AlertDate']} ${item['AlertStartTime']}`,
      'DD-MMM-YYYY HH:mm'
    ).format('X')
    // const name = item.Parameters
    return {
      ...item,
      timeStart: +timeStart,
      timeEnd: +timeEnd,
      timestamp: +timeStart,
      xValue: 100,
    }
  })
  
  const option = {
    dataset: {
      source: seriesData,
      dimensions: ['timestamp', 'xValue']
    },
    xAxis: [
      {
        type: 'time',
        name: 'timestamp',
        axisLabel: {
          formatter: '{hh}:{mm}:{ss}'
        }
      },
      {
        type: 'time',
        name: 'timestamp',
        axisLabel: {
          formatter: '{hh}:{mm}:{ss}'
        }
      }
    ],
    yAxis: {
      show: true
    },
    dataZoom: [
      {
        type: 'slider',
        start: 0,
        end: 100
      },
      {
        start: 0,
        end: 100
      }
    ],
    series: [
      {
        name: 'Timestamp',
        type: 'line',
        symbol: 'none',
        symbolSize: 7,
        encode: {
          x: 'timestamp',
          y: 'xValue'
        },
        itemStyle: {
          color: 'transparent'
        },
        markArea: {
          symbol: ['none', 'none'],
          data: chartPieceData.value
        }
      }
    ]
  }
  // debugger
  clinicalAlertChart.setOption(option)
}

const convertToPieceData = (clinicalAlertsChartData) => {
  chartPieceData.value = clinicalAlertsChartData.map((item) => {
    return [
     {
      name: 'Clinical Alert',
      xAxis: item.start,
      itemStyle: {
        color: 'rgba(221, 221, 221, 0.5)'
      }  
     },
     {
      xAxis: item.end,
      itemStyle: {
        color: 'rgba(221, 221, 221, 0.5)'
      }
     }
    ]
  })

}

const convertToTableData = (clinicalAlertsTableData) => {
  // debugger 
  chartSeriesData.value = clinicalAlertsTableData
    .map((item) => {
      // debugger 
      // const alertStartTimeWithDate;
      // const alertEndTimeWithDate;
      const returnData =  {
        AlertStartTime: item['Alert-startTime'],
        AlertEndTime: item['Alert-endTime'],
        AlertDate: item['Alert-Date'],
        Priority: item['Priority'],
        Parameters: item['Parameters'],
        Value: item.Value,
        Acknowledged: item.Acknowledged,
        ActionTaken: item['Action-Taken']
      }

      return returnData;
    })
    // debugger 
    .sort((a, b) => {
      const aAlertStartTimeDate = `${a.AlertDate} ${a.AlertStartTime}`;
      const bAlertStartTimeDate = `${b.AlertDate} ${b.AlertStartTime}`;
      const aAlertStartTime = moment(aAlertStartTimeDate, 'DD-MMM-YYYY HH::mm').format('X')
      const bAlertStartTime = moment(bAlertStartTimeDate, 'DD-MMM-YYYY HH::mm').format('X')
      return bAlertStartTime - aAlertStartTime
    })
}

const getClinicalDataFromStore = () => {
  const clinicalAlertsChartData = clinicalAlerts['clinical-alerts']
  const clinicalAlertsTableData = clinicalAlerts['table-value']
  convertToPieceData(clinicalAlertsChartData)
  convertToTableData(clinicalAlertsTableData)

  setChartOptions()
}

onMounted(() => {
  getClinicalDataFromStore();
})

onUnmounted(() => {
  console.log('Hello')
})
</script>
<style lang="scss" scoped>
#clinical-alerts-elememt {
  width: 100%;
  height: 200px;
}
</style>
