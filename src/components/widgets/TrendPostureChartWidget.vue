<template>
  <div>
    <h1>Posture Chart</h1>
    <div id="trend-posture-chart-widget" class="trend-posture-chart-widget">
      <StepLineChart :options="chartOption"/>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import StepLineChart from "../charts/step-line-chart.vue";

const chartOption = ref({});


const props = defineProps({
  chartData: {
    type: Object,
    default: () => {}
  }
});


onMounted(() => {
  setOptions(props.chartData);
})

onUnmounted(() => {

})

const setOptions = ( data) => {
  const columns = data.columns;
  let connectionLosses = data['connection-loss'];
  const manualEvents = data['manual-events'];
  const clinicalEvents = data['clinical-alerts'];
  const manualClinicalEvents = [
    ...(manualEvents.map((item) => {
      return [
        {
          name: 'Manual Events',
          xAxis: item.start,
          itemStyle: {
            color: 'rgba(122, 217, 162, 0.5)' 
          }
        },
        {
          xAxis: item.end,
          itemStyle: {
            color: 'rgba(122, 217, 162, 0.5)' 
          }
        }
      ]
    })),
    ...(clinicalEvents.map((item) => {
      return [
        {
          name: 'Clinical Alerts',
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
    }))
  ]
  const chartData = columns || [];
  const chartDataSetData = chartData.map((item) => {
    return {
      ...item,
      timestamp: item.timeUnix,         
    }
  })
  connectionLosses = connectionLosses.map((item) => {
    return {
      min: item.start,
      max: item.end,
      // color: '#000' 
    }
  })
  console.log(connectionLosses)


  chartOption.value = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      }
    },
    dataset: {
      source: chartDataSetData,
      dimensions: ['timestamp', 'value'],
    },
    xAxis: { 
      type: 'time', 
      name: 'timestamp',
      axisLabel: { formatter: "{hh}:{mm}:{ss}" },
      splitLine: {
        show: false
      }
    },
    yAxis: { 
      name: 'Value',
      type: 'value'
    },
    toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
    }
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
        name: 'Posture',
        type: 'line',
        symbol: 'none',
        symbolSize: 7,
        sampling: 'lttb',
        encode: {
          x: 'timestamp',
          y: 'Value'
        },
        itemStyle: {
          color: '#00549F'
        },
        step: true,
        markArea: {
          symbol: ['none', 'none'],
          data: manualClinicalEvents
        },
      },
    ]
  }
}

watch(() => props.chartData, (newChartData) => {
   
  if(newChartData && Object.keys(newChartData).length){
    setOptions(newChartData);
  }
})
</script>
<style lang="scss" scoped>

</style>