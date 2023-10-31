<template>
  <div id="square-line-chart-box" class="square-line-chart-box">
    <h1>Square Step</h1>
    <div id="square-line-chart" ref="squareLineRef" class="square-line-chart">

    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, shallowRef, ref , watch } from "vue";
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  DatasetComponent,  
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  DatasetComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  LineChart,  
  UniversalTransition,
  CanvasRenderer,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  
]);
const squareLineRef = ref(null);

const props = defineProps({
  options: {
    type: Object,
    default: () => {}
  }
})

const myChart = shallowRef(null);

onMounted(() => {
  myChart.value = echarts.init(squareLineRef.value);
  // debugger 
})

onUnmounted(() => {

})

const drawChart = (options) => {
  myChart.value.setOption(options);
}

watch(() => props.options, (newOptions, oldOptions) => {
  // debugger 
  console.log(oldOptions  )
  if(newOptions && Object.keys(newOptions).length){
    // debugger
    drawChart(newOptions)
  }
})
</script>
<style lang="scss" scoped>
.square-line-chart{
  width: 100%;
  height: 200px;
}
</style>