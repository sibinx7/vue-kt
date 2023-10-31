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

const setOptions = (data) => {
  const chartData = data.columns || [];
  const chartOptions = chartData.map((item) => {
    return {
      ...item,
      timestamp: item.timeUnix,         
    }
  })
  chartOption.value = {
    tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%'];
    }
  },
    dataset: {
      source: chartOptions,
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
      end: 20
    },
    {
      start: 0,
      end: 20
    }
  ],
    series: [
      {
        name: 'Posture',
        type: 'line',
        symbol: 'circle',
        symbolSize: 7,
        sampling: 'lttb',
        encode: {
          x: 'timestamp',
          y: 'Value'
        },
        markLine: {
          symbol: ['none', 'none'],
          data:[
            {
              xAxis: 1694723617,
              symbol: 'none',
              lineStyle: {
                color: '#008000',
                type: 'solid',
                width: 3 

              }
            },
            {
              xAxis: 1694793800,
              symbol: 'none',
              lineStyle: {
                color: '#008000',
                type: 'solid',
                width: 3
              }
            }
          ]
        }
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