<template>
  <div>
    <h1>Trend </h1>
    <div v-for="trendKey, index in trendsDataKeys" :key="index"> 
      <h4>{{  trendKey  }}</h4>
      <div v-if="trendsComponents[trendKey]">
        <component 
      :is="trendsComponents[trendKey]" 
      :trend-key="trendKey"
      :chart-data="multiChartData[trendKey]"/>
      </div>        
      
    </div>
  </div>

</template>
<script setup>
  import { onMounted, ref, markRaw } from 'vue';
  import TrendBPChartWidget from '../widgets/TrendBPChartWidget.vue';
  // import TrendSKINTEMPChartWidget from '../widgets/TrendSKINTEMPChartWidget.vue';
  import TrendChart from '../widgets/TrendChartWidget.vue';
  import TrendPostureChartWidget from '../widgets/TrendPostureChartWidget.vue';
  import useReportStore from '../../stores/report';


  const reportStore = useReportStore();
  
  const trendsDataKeys = ref([]);
 
  const multiChartData = ref({});
  const trendsComponents = ref({});
  const keyComponent = {
    BP: markRaw(TrendBPChartWidget),
    Posture: markRaw(TrendPostureChartWidget)
    // SKINTEMP: TrendSKINTEMPChartWidget,  

  }

  onMounted(() => {
    const trends = reportStore.trends;        
    multiChartData.value = trends; 
    trendsDataKeys.value = Object.keys(trends);
    trendsDataKeys.value.forEach((item)=> {
      trendsComponents.value[item] = keyComponent[item] ? keyComponent[item] : markRaw(TrendChart) 
    });        
  })
</script>
<style lang="scss" scoped>

</style>