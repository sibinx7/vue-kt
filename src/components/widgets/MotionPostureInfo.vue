<template>
  <div>
    <div>
      <div>
        <ul class="motion-posture-list">
          <li v-for="(motionPostureItem, index) in motionPostureData" :key="index">
            <div>
              <div></div>
              <div class="text-center">
                <div>
                  <span>{{  motionPostureItem.name }}</span>
                </div>
                <div>
                  <span>{{  motionPostureItem.value }}</span>
                </div>                
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import useReportStore from "../../stores/report";

const motionPostureData = ref([]);

const reportStore = useReportStore();

onMounted(() => {
  const motionPosture = reportStore.motionPosture;
  const motionStatistics = motionPosture.Statistics;
  const motionStatisticsKeys = Object.keys(motionStatistics);
  motionPostureData.value = motionStatisticsKeys.map((key) => {
    const value = motionStatistics[key];
    return {
      name: key.replace(/-/g, ' '),
      value,
      key 
    }
  })
})

</script>
<style lang="scss" scoped>
.motion-posture-list{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
}
</style>