<template>
  <div class="card mb-5">
    <div class="card-body">
      <select v-model="selectedRef" class="form-control">
        <option value="">Select</option>
        <option value="refA">refA</option>
        <option value="refB">refB</option>
        <option value="refC">refC</option>
      </select>
    </div>
    <br>
    <div ref="refGroup" class="list-group">
      <div ref="refA" class="list-group-item">Ref A</div>
      <div ref="refB" class="list-group-item">Ref B</div>
      <div ref="refC" class="list-group-item">Ref C</div>
    </div>
  </div>
</template>
<script>
export default ({
  name: 'refs',
  watch:{
    selectedRef: function(newValue, oldValue){
      console.log(oldValue)
      console.log('Change in the selected ref', newValue)
      const groupRefClasses = this.$refs['refGroup'].querySelectorAll('.list-group-item');
      console.log(groupRefClasses)
      console.log('Check above')
      groupRefClasses.forEach(element => {
        element.classList.remove('color-it')
      });
      if(newValue){
        console.log(this.$refs[newValue])
        const selectedElement = this.$refs[newValue];
        selectedElement.classList.add('color-it');
      }      
    }
  },
  data(){
    return {
      selectedRef: ''
    }
  }
})
</script>
<style scoped>
  .color-it{
    background: rgb(161, 61, 61);
    color: #fff;

  }
</style>
