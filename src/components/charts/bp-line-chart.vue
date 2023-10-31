<template>
  <div id="bp-line-chart-box" class="bp-line-chart-box">
    <div id="bp-line-chart" ref="bpLineChartRef" class="bp-chart-element">

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
const props = defineProps({
  options: {
    type: Object,
    default: () => {}
  }
})
const bpLineChartRef = ref(null);
const myChart = shallowRef(null)

onMounted(() => {
  myChart.value = echarts.init(bpLineChartRef.value);

});

watch( () => (props.options), (newOption, oldOption) => {
  console.log(oldOption)
  if(newOption && Object.keys(newOption).length){
    drawChart(newOption);
  }
})

const drawChart = (options) => {
  myChart.value.setOption(options)
}

onUnmounted(() => {

})
</script>
<style lang="scss" scoped>
.bp-chart-element{
  width: 100%;
  height: 200px;
}
</style>