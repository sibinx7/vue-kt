<template>
  <div class="trend-bp-chart-widget">
    <h1>BP Chart</h1>
    <BPLineChart :options="chartOption"/>
  </div>
</template>
<script setup>
import { defineProps, onMounted, onUnmounted, ref } from "vue";
import BPLineChart from "../charts/bp-line-chart.vue";


const chartOption = ref({});


const props = defineProps({
  chartData: {
    type: Object,
    default: () => {}
  }
});



onMounted(() => {
  const plotData = (props.chartData.columns || []).map((item) => {
    return {
      timestamp: item.timeUnix,
      SBP: item.SBP,
      DBP:item.DBP 
    }
  });

  setTimeout(() => {
    if(plotData.length){
      setChartOptions({plotData});
    }    
  },500)
  
})

onUnmounted(() => {

})

const setChartOptions = ({plotData }) => {
  // debugger

  
  // debugger 
  chartOption.value = {
    dataset: {
      source: plotData,
      dimensions: ['timestamp', 'SBP', 'DBP'],
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
      name: 'degree',
      type: 'value'
    },
    series: [
      {
        name: 'Systolic Pressure',
        type: 'line',
        symbol: 'circle',
        symbolSize: 7,
        encode: {
          x: 'timestamp',
          y: 'SBP'
        },
        itemStyle: {
          color: '#2887DC'
        },
      },
      {
        name: 'Diastolic Pressure',
        type: 'line',
        symbol: 'circle',
        symbolSize: 7,
        encode: {
          x: 'timestamp',
          y: 'DBP'
        },
        itemStyle: {
          color: '#033B6C'
        }
      }
    ]
  }

}

</script>
<style lang="scss" scoped>

</style>