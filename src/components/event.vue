<template>
  <div class="card">
    <div class="card-header">
      <h4>Events</h4>
    </div>
    <div class="card-body">
      <div class="alert alert-info">
        Close 
        <button type="button" class="btn-close" aria-label="Close" @click="closeClick"></button>

      </div>
    </div>
    <div class="card-footer text-right">
      <button class="btn btn-cancel" @click="cancelClick">Cancel</button>
      <button class="btn btn-success" @click="saveClick">Save</button>
    </div>
  </div>  
</template>
<script>
export default {
  name: 'event',
  data(){
    return {

    }
  },
  methods: {
    saveClick(){
      this.$emit('callbackEvent', {
        name: 'save'
      })
    },
    cancelClick(){
      this.$emit('callbackEvent', {
        name: 'cancel'
      })
    },
    closeClick(){
      this.$emit('callbackEvent', {
        name: 'close'
      })
    }
  }
}
</script>
<style scoped>

</style>