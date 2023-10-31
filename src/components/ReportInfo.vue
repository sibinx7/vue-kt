<template>
  <div class="report-area">
    <div class="heading-area text-center">
      <h2>Patient Monitoring Report</h2>
      <div>
        <PatientInfo/>
      </div>
      <div>
        <div>
          <VitalSignsAlert/>
        </div>
        <div>
          <MotionPostureVue/>
        </div>
        <div>
          <TrendsSection/>
        </div>
        <div>
          <ManualEventsSectionVue/>
        </div>
        <div>
          <ClinicalAlertsSectionVue/>
        </div>

      </div>
    </div>
  </div>
</template>
<script setup>
import MotionPostureVue from './motion-posture.vue';
import PatientInfo from './PatientInfo.vue';
import ClinicalAlertsSectionVue from './sections/ClinicalAlertsSection.vue';
import ManualEventsSectionVue from './sections/ManualEventsSection.vue';
import TrendsSection from './sections/TrendsSection.vue';
import VitalSignsAlert from './vital-signs-alert.vue';

</script>
<style lang="sass" scoped>

</style>