<template>
  <div class="manual-alerts-table-wrapper">
    <EasyDataTable :headers="headerData">
      <template #item-EventTime>

      </template>
      <template #item-Symptom>

      </template>
      <template #item-Activity>

      </template>
      <template #item-Acknowledgement>

      </template>
      <template #item-Notes>

      </template>
    </EasyDataTable>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import useReportStore from '../../stores/report';
const reportStore = useReportStore();
const tableData = ref([]);
const headerData = [
  { text: 'Event Time', value: 'EventTime'},
  { text: 'Symptoms', value: 'Symptoms'},
  { text: 'Activity', value: 'Activity'},
  { text: 'Acknowledgement', value: 'Notes'}
]

onMounted(() => {

});


onUnmounted(() => {

});
</script>
<style lang="scss" scoped>

</style>