<template>
  <div id="line-chart-box" class="line-chart-wrapper">
    <div id="line-chart-element" ref="lineChartRef" class="bp-chart-element">

    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref, shallowRef, watch } from "vue";
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
  CanvasRenderer
]);

const lineChartRef = ref(null);
const chartInstance = shallowRef({});

const props = defineProps({
  options: {
    type: Object,
    default: () => {}
  }
})

onMounted(() => {
  chartInstance.value = echarts.init(lineChartRef.value);
  // drawGraph(props.options)
})

onUnmounted(() => {

  
})

const drawGraph = (option) => {
  chartInstance.value.setOption(option)
}

watch(() => props.options, (newOptions) => {
  if(newOptions && Object.keys(newOptions).length){
    drawGraph(newOptions);
  }  
})

</script>
<style lang="scss" scoped>
.bp-chart-element{
  width: 100%;
  height: 200px;
}
</style>