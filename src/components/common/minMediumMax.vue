<template>
  <div class="min-medium-max-wrapper">
    <div class="min-medium-max">
      <div class="min-info info-bulb">
        <span class="info-bulb-value info-bulb-common">{{ statistics.data.Min }}</span>
        <span class="info-bulb-label info-bulb-common">Min</span>
      </div>
      <div class="medium-info info-bulb"> 
        <span class="info-bulb-value info-bulb-common">
          {{  statistics.data.Avg }}
        </span>
        <span class="info-bulb-label info-bulb-common">Avg</span>
        
      </div>
      <div class="max-info info-bulb"> 
        <span class="info-bulb-value info-bulb-common">
          {{  statistics.data.Max }}
        </span>
        <span class="info-bulb-label info-bulb-common">
          Max
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
defineProps({
  statistics: {
    type: Object,
    default: () => {}
  }
})
</script>
<style lang="scss" scoped>
  .min-medium-max-wrapper{
    position: relative;
    padding: 40px;
    // background: #eee;
  }
  .min-medium-max{
    position: relative;
    width: 100%;
    min-width: 240px;
    height: 4px;
    background: rgb(10, 68, 95);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .info-bulb{
    position: relative;
    .info-bulb-common{
      position: absolute;
      width: 80px;     
      text-align: center;
    } 
    .info-bulb-value{
      top: -30px;
    }
    .info-bulb-label{
      bottom: -30px;
      top: auto;
    }
    &:before{
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgb(10, 68, 95);
      top: calc(50% - 10px);
    }
  }

  .min-info{
    &.info-bulb{
      &:before{
        left: -10px;        
      }
      .info-bulb-common{
        left: calc(-40px);
      }

    }
  }
  .medium-info{
    &.info-bulb{
      &:before{
        left: calc(50% - 10px);
      }
      .info-bulb-common{
        left: calc(0px);
        text-align: center;
      }
    }
  }
  .max-info{
    &.info-bulb{
      &:before{
        right: -10px;
        left: auto;
      }
      .info-bulb-common{
        right: -40px;
        left: auto;
      }
    }
  }
</style>