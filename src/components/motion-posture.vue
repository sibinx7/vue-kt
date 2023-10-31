<template>
  <div class="motion-posture-component">
    <div class="motion-posture-chart">
      <MotionPosturePie/>
    </div>
    <div class="motion-posture-info">
      <MotionPostureInfo/>
    </div>
  </div>
</template>
<script setup>
import MotionPosturePie from './charts/motion-posture-pie.vue';
import MotionPostureInfo from './widgets/MotionPostureInfo.vue';
</script>
<style lang="scss" scoped>
.motion-posture-component{
  display: flex;
  width: 100%;
}
.motion-posture-info{
  
  flex: 100% 0 1;
}
</style>