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
      setChartOptions(plotData);
    }    
  },500)
  
})

onUnmounted(() => {

})

const setChartOptions = (data) => {
  // debugger

  
  // debugger 
  chartOption.value = {
    dataset: {
      source: data,
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
      {
        name: 'Diastolic Pressure',
        type: 'line',
        symbol: 'circle',
        symbolSize: 7,
        encode: {
          x: 'timestamp',
          y: 'DBP'
        }
      }
    ]
  }

}

</script>
<style lang="scss" scoped>

</style>