<template>
  <div class="trend-skin-temp-chart-widget">
    <div>

    </div>
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