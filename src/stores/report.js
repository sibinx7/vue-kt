import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
// import reportData from "../db/data.json";
import reportData from "../db/dummygenRepo.json";
import moment from 'moment';

 const useReportStore = defineStore('report', () => {
  const report = reactive(reportData)
  const reportInfo = computed(() => report['report']);
  const personalInfo = computed(() => report['reportData']['Personal-Info']);
  const hospitalInfo = computed(() => report['reportData']['Hospital-Info']);
  const vitalSignsAlerts = computed(() => report['reportData']['VitalSignsAlerts']);
  const motionPosture = computed(() => report['reportData']['Motion-Posture']);
  const manualEvents = computed(() => report['reportData']['Manual-Events']);
  const clinicalAlerts = computed(() => report['reportData']['Clinical-Alerts']);
  const trends = computed(() => {
    const trends = report['reportData']['Trends'];
    const trendsBPDIA = trends['BPDIA'];
    const trendsBPSYS = trends['BPSYS'];
    const trendsBPDIAColumn = trendsBPDIA['columns'];
    const trendsBPSYSColumn = trendsBPSYS['columns'];
    const bpColumns = trendsBPDIAColumn.map((item, index) => {
      const trendBPSYSItem = trendsBPSYSColumn[index];
      return {
        field: 'BP',
        timeUnix: item.timeUnix,
        SBP: trendBPSYSItem.value,
        DBP: item.value 
      }
    })

    delete trends['BPDIA'];
    delete trends['BPSYS'];

    trends['BP'] = {
      columns: bpColumns,
      'manual-events': trendsBPDIA['manual-events'],
      'clinical-alerts': trendsBPDIA['clinical-alerts'],
      'connection-loss': trendsBPDIA['connection-loss']
    }


    return trends
  });
  const locationAndGroup = computed(() => report['reportData']['Location-and-Group']);
  const patchType = computed(() => report['reportData']['patchType']);
  const units = computed(() => report['reportData']['units']);
  const timezone = computed(() => report['reportData']['timezone']);
  const clinicalAlertsTableData = computed (() => {
    const tableValue = clinicalAlerts.value['table-value'];
    return tableValue.map((item) => {
      const ValueData = () => {
        let unit;
        switch(item.Parameters){
          case 'SKINTEMP':
            unit = 'º'
            break;
          case 'RR':
            unit = 'brpm'
            break;
          case 'HR':
            unit = 'bpm';
            break;
          case 'SpO2':
            unit = '%';
            break;
          case 'Sys':
            unit = 'mmHg';
            break;
          case 'BPDIA':
            unit = 'mmHg';
            break;
          case 'BPSYS':
            unit = 'mmHg';
            break;
          default:
            break;
        }
        let symbol = item.Priority === 'LOW' ? '<': '>';
        return {
          value: item.Value,
          unit, 
          symbol
        }
      };
      const AcknowledgedData= () => {
        const Acknowledged = item.Acknowledged;
        let timeFormat = '';
        if(Acknowledged && Acknowledged.time){
          const momentDate = moment(Acknowledged.time);
          if(momentDate.isValid()){
            timeFormat = momentDate.format('HH:mm DD/MM/YYYY')
          }
          
        }
        return {
          by: Acknowledged && Acknowledged.by,
          time: Acknowledged && Acknowledged.time,
          timeFormat
        }
      } 
      return {
        ...item,
        AlertStartTime: item['Alert-startTime'],
        AlertEndTime: item['Alert-endTime'],
        AlertDate: item['Alert-Date'],
        ActionTaken: item['Action-Taken'],
        ValueData: ValueData(),
        AcknowledgedData: AcknowledgedData()
      }
    });
  })
  return { report, personalInfo, hospitalInfo, vitalSignsAlerts, motionPosture,
    manualEvents, clinicalAlerts, trends, locationAndGroup,
    reportInfo, patchType, units, timezone, clinicalAlertsTableData
  }
})

export default useReportStore;