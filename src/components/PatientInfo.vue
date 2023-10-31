<template>
  <div class="report-header">
    <div class="report-logo">
      <div></div>
    </div>
    <div style="width: 80%;">
      <!-- Patient Personal Info -->
      <h4>{{User.Name}}</h4>
      <div style="display: flex;">
        <div class="user-detail">
          <div class="user-info">
            <ul class="user-list">
              <li>
                <span class="text-left">MRN</span>
                <span class="text-right">{{User.MRN}}</span>
              </li>
              <li>
                <span class="text-left">DOB</span>
                <span class="text-right">{{User.dob}}</span>
              </li>
              <li>
                <span class="text-left">Sex</span>
                <span class="text-right">{{User.sex}}</span>
              </li>
              <li>
                <span class="text-left">Location</span>
                <span class="text-right">{{User.Address}}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- End Patient Personal Info -->
        <!-- Patient Hospital Info -->
        <div class="report-info">
          <ul class="user-list">
            <li>
              <span class="text-left">Admitted</span>
              <span class="text-right">{{Admitted}}</span>
            </li>
            <li>
              <span class="text-left">Discharged</span>
              <span class="text-right">{{Discharged}}</span>
            </li>
            <li>
              <span class="text-left">Report From</span>
              <span class="text-right">{{Report.fromDate}}</span>
            </li>
            <li>
              <span class="text-left" style="padding-left: 41px">To</span>
              <span class="text-right">{{Report.toDate}}</span>
            </li>
            <li>
              <span class="text-left" style="padding-left: 41px">Printed</span>
              <span class="text-right">{{Report.printed}}</span>
            </li>
          </ul>
        </div>
        <!-- End Patient Hospital Info -->
      </div>
    </div>
  </div>
</template>
<script setup>

  import {
    computed
  } from "vue";
  import useReportStore from '../stores/report';

  const reportStore = useReportStore();
  const personalInfo = reportStore.personalInfo || {};
  const hospitalInfo = reportStore.hospitalInfo || {};

  const User = computed(() => {
    return {
      ...personalInfo,

    }
  })
  const Report = computed(() => {
    return {
      fromDate: hospitalInfo.Report['from-date'],
      toDate: hospitalInfo.Report['to-date'],
      printed: hospitalInfo.Report['printed']
    }
  })

  const Admitted = computed(() => {
    return hospitalInfo.Admitted
  })

  const Discharged = computed(() => {
    return hospitalInfo.Discharged;
  })
</script>