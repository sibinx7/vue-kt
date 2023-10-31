<template>
  <div class="vital-signs-alert">
    <div class="vital-signs-alert-piechart">
      <div id="vsa-piechart" 
        ref="vsaPieChartElement"
        class="piechart-component"></div>
    </div>
  </div>
</template>
<script setup>
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
import { onMounted, ref } from 'vue';

import useReportStore from '../../stores/report';

const reportStore = useReportStore();
const vitalSignsAlerts = reportStore.vitalSignsAlerts;
const pieValues = vitalSignsAlerts.PieValue.data;

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

const vsaPieChartElement = ref(null);


const vsaOptions = {
  title: {
    text: 'Alerts (% time)',  
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
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: []
    }
  ],

}


onMounted(() => {
  const vsaPieChart = echarts.init(vsaPieChartElement.value);
  const vsaPitChartData = pieValues.map((item) => {
    return {
      ...item,
      name: item.label 
    }
  })
  vsaOptions.series[0] = {
    ...vsaOptions.series[0],
    color: pieValues.map((item) => item.color),
    data: vsaPitChartData
  }
  // debugger
  vsaPieChart.setOption(vsaOptions);
  
})
</script>
<style lang="scss" scoped>
.piechart-component{
  width: 400px;
  height: 400px;
  padding-right: 20px;
}
</style>