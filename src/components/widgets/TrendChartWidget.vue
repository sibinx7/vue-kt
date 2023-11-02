<template>
  <div class="trend-chart-widget">    
    <div id="trend-line-chart">
      <CommonLineChart :options="chartOptions"/>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import CommonLineChart  from "../charts/common-line-chart.vue";

const props = defineProps({
  chartData: {
    type: Object,
    default: () => {}
  },
  trendKey: {
    type: String,
    default: ''
  }
})
const chartOptions = ref({});

onMounted(() => {
  setOptions(props.chartData);
})

onUnmounted(() => {

});

const setOptions = (data) => {
  // debugger 
  const columns = data.columns;
  const manualEvents = data['manual-events'];
  const clinicalAlerts = data['clinical-alerts'];
  const connectionLoss = data['connection-loss'];
  const dataSetData = columns.map((item) => {
    return { 
      timestamp: item.timeUnix, 
      value: item.value 
    }
  });

  const connectionLoseData = (connectionLoss).map((item) => {
    return {
      min: item.start,
      max: item.end,
      // color: 'transparent',
      // symbol: 'circle' 
    }
  });

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
  const manualClinicalEvents = [
    ...(manualEvents.map((item) => {
      return [
        {
          name: 'Manual Event',
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
  chartOptions.value = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      }
    },
    dataset: {
      source: dataSetData,
      dimensions: ['timestamp', 'value']
    },
    xAxis: {
      type: 'time',
      name: 'timestamp',
      axisLabel : {
        formatter: "{hh}:{mm}:{ss}"
      },
      splitLine: {
        show: false 
      }
    },
    yAxis: {
      name: 'degree',
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
      end: 100
    },
    {
      start: 0,
      end: 100
    }
  ],
  visualMap: visualMapData,
    series: [
      {
        name: '',
        type: 'line',
        symbol: 'none',
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
          data: manualClinicalEvents
        }
      }
    ]
  }

}

watch(() => props.chartData, (newChartData) => {
  if(newChartData && Object.keys(newChartData).length){
    // 
    setOptions(newChartData);
  }
})
</script>
<style lang="scss" scoped>

</style>