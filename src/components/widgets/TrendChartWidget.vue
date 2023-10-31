<template>
  <div class="trend-chart-widget">

  </div>
</template>
<script setup>
import { defineProps } from "vue";
defineProps({
  chartData: {
    type: Object,
    default: () => {}
  }
})
</script>
<style lang="scss" scoped>

</style>