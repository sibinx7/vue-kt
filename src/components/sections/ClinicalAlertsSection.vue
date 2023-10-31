<template>
  <div class="clinical-alerts-section-wrapper">
    <div class="clinical-alerts-section">
      <ClinicalAlertsTimeseriesVue/>
    </div>
    <div>
      <ClinicalAlertsTable/>
    </div>
  </div>
</template>
<script setup>
import ClinicalAlertsTimeseriesVue from '../charts/clinical-alerts-timeseries.vue';
import ClinicalAlertsTable from '../widgets/ClinicalAlertsTable.vue';


</script>
<style lang="scss" scoped>

</style>