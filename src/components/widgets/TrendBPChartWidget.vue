<template>
  <div class="trend-bp-chart-widget">    
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
  

  setTimeout(() => {
    setChartOptions(props.chartData);   
  },500)
  
})

onUnmounted(() => {

})

const setChartOptions = (chartData) => {
  // debugger
  const plotData = (chartData.columns || []).map((item) => {
    return {
      timestamp: item.timeUnix,
      SBP: item.SBP,
      DBP:item.DBP 
    }
  });

  const manualAlerts = chartData['manual-events'];
  const clinicalAlerts = chartData['clinical-alerts'];
  const connectionLoseData = (chartData['connection-loss'] || []).map((item) => {
    return {
      min: item.start,
      end: item.end,
      color: 'red' 
    }
  })
  let visualMapData = {};
  if(connectionLoseData.length){
    visualMapData = {
      show: false,
      dimension: 0,
      type: 'piecewise',
      pieces: connectionLoseData,
      outOfRange: {
        color: '#033B6C'
      },     
    }
  }

  const manualClinicalAlerts = [
    ...(manualAlerts.map((item) => {
      return [
        {
          name: 'Manual Alerts',
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
    ...(clinicalAlerts.map((item) => {
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
  visualMapData,
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
        markArea: {
          symbol: ['none', 'none'],
          data: manualClinicalAlerts 
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