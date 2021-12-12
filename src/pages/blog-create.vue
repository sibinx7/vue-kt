<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "blog-create",
  data(){
    return {

    }
  },
  beforeRouteEnter(to, from, next){
    console.log('Component before route enter @to')
    console.log(to)
    console.log('Component before route enter @from')
    console.log(from)
    next((vm) => {
      console.log(vm)
    });
  },
  beforeRouteUpdate(to, from, next){
    console.log('Component before route enter @to')
    console.log(to)
    console.log('Component before route enter @from')
    console.log(from)
    next();
  },
  beforeRouteLeave(to, from, next){
    console.log('Component before route enter @to')
    console.log(to)
    console.log('Component before route enter @from')
    console.log(from)
    next();
  }
}
</script>

<style scoped>

</style>