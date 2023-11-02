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
const clinicalAlertsChartData = clinicalAlerts['clinical-alerts']
const clinicalAlertsTableData = clinicalAlerts['table-value']

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
      value: +item.Value,
    }
  })
  // debugger
  const option = {
    dataset: {
      source: seriesData,
      dimensions: ['timestamp', 'value']
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
      show: false
    },
    dataZoom: [
      {
        type: 'slider',
        start: 0,
        end: 10
      },
      {
        start: 0,
        end: 10
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
          y: 'value'
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

  clinicalAlertChart.setOption(option)
}

const convertToPieceData = () => {
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

const convertToTableData = () => {
  chartSeriesData.value = clinicalAlertsTableData
    .map((item) => {
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
    })
    .sort((a, b) => {
      const aAlertStartTime = moment(a.AlertStartTime, 'HH::mm').format('x')
      const bAlertStartTime = moment(b.AlertStartTime, 'HH::mm').format('x')
      return bAlertStartTime - aAlertStartTime
    })
}

onMounted(() => {
  convertToPieceData()
  convertToTableData()

  setChartOptions()
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
