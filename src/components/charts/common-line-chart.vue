<template>
  <div  :id="`common-line-chart-${props.id}`" ref="lineChartRef">
    
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
const lineChartRef = ref(null);
  const props = defineProps({
    id: {
      type: String,
      default: ''
    },
    chartOptions: {
      type: Object,
      default: () => {}
    }
  });
  onMounted(() => {

  })

  onUnmounted(() => {

  })
  
</script>
<style lang="scss" scoped>

</style>