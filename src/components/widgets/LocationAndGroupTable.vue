<template>
  <div class="location-and-group-table">
    <EasyDataTable
      :headers="headers"
      :items="tableData"
    >
      <template #item-TimeData="{ time, timeDate }">
        <div>
          <div>
            <span>{{  time  }}</span>
          </div>
          <div>
            <span>
              {{  timeDate }}
            </span>
          </div>
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import moment from "moment";
import useReportStore from '../../stores/report';
const reportStore = useReportStore();
const locationAndGroup = reportStore.locationAndGroup;
const locationTableData = locationAndGroup['table-value'];
const tableData = ref([]);
const headerData = [
  { text: 'Time and Date', value: 'TimeDate'},
  { text: 'Location Group', value: 'LocationGroup'},
  { text: 'Medical Group', value: 'MedicalGroup'},
  { text: 'Assigned By', value: 'AssignedBy'}

];
const headers = ref(headerData);

onMounted(() => {
  tableData.value = locationTableData.map((item) => {
    const timeDate = () => {
      return moment(`${item.Date} ${item.Time}`, 'DD-MM-YYYY')
        .format('DD/MM/YYYY')
    }
    return {
      ...item,
      LocationGroup: item['Location-Group'],
      ClinicalGroup: item['Clinical-Group'],
      AssignedBy: item['Assigned-By'],
      timeDate: timeDate()
    }
  })
})
</script>
<style lang="scss" scoped>

</style>