<template>
  <div>
    <blockquote class="card  text-left  py-3 px-4 mb-3 mt-4  ">
      <div v-for="(comment, index) of comments" :key="index" class="row align-items-center justify-content-between">
        <div class="col-3  p-md-1 text-center rounded">
          <img src="https://via.placeholder.com/80/5fa9f8/efefef" class="img-fluid py-0 rounded" alt="features">
          <div class=" small p-1"><span class="small">{{  comment.name }} </span></div>
        </div>
        <div class="col-9">

          <p class=" m-0 text-muted small">
            {{  comment.comment }}
          </p>
        </div>
      </div>
    </blockquote>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "comment",
  data(){
    return {
      comments: []
    }
  },
  mounted() {
    this.callComments();
  },
  methods: {
    async callComments(){
        const postId = this.$route.params.id;
        if(postId){
          const response = await axios.get(`http://localhost:3000/blog/show-comments/${postId}`);
          if(response){
            this.comments = response.data;
          }
        }
    }
  }
}
</script>

<style scoped>

</style>