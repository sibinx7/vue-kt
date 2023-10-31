<template>
  <div class="vital-signs-wrapper">
    <div class="vital-signs-chart">
      <VitalSignsAlertPieVue/>
    </div>
    <div class="vital-signs-content">
      <div class="min-max-grid">        
        <div v-for="(singleData, index) in statisticsCollection" :key="index">                    
          <div class="vital-sign-single">
            <div class="vital-sign-single-full">
              <div class="vital-sign-left">
                <h1>
                  {{  singleData.Name }}
                </h1>
              </div>
              <div class="vital-sign-right">
                <div class="vsr-box">
                  <MinMediumMaxVue :statistics="singleData"/>
                  <div class="alert-box">
                    <h2 class="alert-box-value">{{  singleData.data.Alerts  }}</h2>
                    <h3 class="alert-box-label">Alerts</h3>
                  </div>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import useReportStore from '../stores/report';
import VitalSignsAlertPieVue from './charts/vital-signs-alert-pie.vue';
import MinMediumMaxVue from './common/minMediumMax.vue';
const statisticsCollection = ref([]);
const reportStore = useReportStore();


onMounted(() => {
  const vitalSignsAlerts = reportStore.vitalSignsAlerts;
  const statistics = vitalSignsAlerts.Statistics || {};
  const statisticsKey = Object.keys(statistics);
  const statisticsValues = Object.values(statistics);
  const tempStatisticsData = statisticsKey.map((item, index) => {
    return {
      Name: item,
      data: statisticsValues[index]
    }
  })
statisticsCollection.value = (tempStatisticsData)
})




</script>
<style lang="scss" scoped>
.vital-signs-wrapper{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.min-max-grid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.vital-sign-single{
  background: #edf5fd;
}
.vital-sign-single-full{
  display: flex;
  padding: 15px;
  justify-content: space-between;
}

.vsr-box{
  display: flex;
  padding: 10px 20px;
  align-items: center;
}

.alert-box{
  .alert-box-value{
    margin-top: 0;
    margin-bottom: 5px;
  }
  .alert-box-label{

  }
  .vital-signs-wrapper{
    display: flex;
  }
  .vital-signs-content{
    width: 100%;
  }
}
</style>