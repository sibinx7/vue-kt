<template>
  <div class="motion-posture-wrapper">
    <div class="motion-posture-chart-wrapper">
      <div class="motion-posture-chart-inner">
        <div id="motion-posture-id" ref="motionPostureRef" 
        class="motion-posture-element piechart-component"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import useReportStore from '../../stores/report';
import { onMounted, onUnmounted, ref } from "vue";
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  AriaComponent,
  GridComponent,
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  AriaComponent,
  GridComponent  
]);

const reportStore = useReportStore();
const motionPosture = reportStore.motionPosture;
const motionPostureChart = motionPosture.PieValue;
const pieValues = motionPostureChart.data;

const motionPostureRef = ref(null);

const mpOptions = {
  title: {
    text: 'Motion (% time)',  
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'horizontal',
    left: 'center',
    bottom: 0
  },
  aria: {
    enabled: true,
    show: true,
    decal: {
      show: true 
    }
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: '50%',
      data: []
    }
  ],

}

onMounted(() => {
  // mounted life cycle 
  const mpPieChart = echarts.init(motionPostureRef.value);
  const mpPieChartData = pieValues.map((item) => {
    return {
      ...item,
      name: item.label 
    }
  })
  mpOptions.series[0] = {
    ...mpOptions.series[0],
    color: pieValues.map((item) => item.color),
    data: mpPieChartData
  }
  // debugger
  mpPieChart.setOption(mpOptions);
});

onUnmounted(() => {
  // unmount 
})

</script>
<style lang="scss" scoped>
.piechart-component{
  width: 400px;
  height: 400px;
  padding-right: 20px;
}
</style>