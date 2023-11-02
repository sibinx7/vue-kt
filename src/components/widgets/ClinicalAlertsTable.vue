<template>
  <div>
    <EasyDataTable
      :headers="headers"
      :items="tableData"
    >
      <template #item-AlertTime="item">
        <div>
          <div>
            <span>{{  item.AlertStartTime }}</span>
            <span>-</span>
            <span>{{  item.AlertEndTime }}</span>
          </div>
          <div>
            <span>{{  item.AlertDate }}</span>
          </div>
        </div>
      </template>
      <template #item-Acknowledged="{ Acknowledged }">
        <div v-if="Acknowledged &&  (Acknowledged.by && Acknowledged.time)">
          <div>
            <span>by 
              <span>{{ Acknowledged.by }}</span>
            </span>
          </div>
          <div>
            <span>{{  Acknowledged.timeFormat }}</span>
          </div>
        </div>
        <div v-else>
          <span>---</span>
        </div>
      </template>

      <template #item-Value="{ ValueData }">
        <div>
          <span>
            {{  ValueData.symbol }}
          </span>
          <span>
            {{  ValueData.value }}
          </span>
          <span>
            {{  ValueData.unit }}
          </span>
        </div>
      </template>
      <template #item-AcitonTaken="{ ActionTaken }">
        <div v-if="ActionTaken">

        </div>
        <div v-else>
          <span>---</span>
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import useReportStore from '../../stores/report';
const reportStore =useReportStore();
const tableData = ref([]);
const headerData = [
  { text: 'Alert Time', value: 'AlertTime' }, 
  { text: 'Priority', value: 'Priority'},
  { text: 'Parameters', value: 'Parameters'},
  { text: 'Value', value: 'Value'},
  { text: 'Acknowledged', value: 'Acknowledged'},
  { text: 'Action Taken (if any)', value: 'AcitonTaken'}
]
const headers = ref(headerData)
onMounted(() => {
  tableData.value = reportStore.clinicalAlertsTableData;
})

</script>
<style lang="scss" scoped>

</style>