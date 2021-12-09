<template>
  <v-card class="card  h-100 border-light  bg-light shadow">
    <div class="card-body ">
      <blockquote class="blockquote mb-4 pb-2">
        <p class="mb-0 font-weight-bold">{{  post.title }}</p>
      </blockquote>
      <p class="card-text mb-5">
        {{ post.content }}
      </p>
      <div class="w-100 pb-1"></div>
      <div class="d-flex align-items-center">
        <div class="meta-author">
          <img class="d-block img-fluid rounded-circle" src="https://via.placeholder.com/40x40/5fa9f8/ffffff " alt="author avatar">
        </div>
        <div class="m-2">
          <a href="#">{{  post.author }}</a>
        </div>
        <div class="meta-item ml-auto">
          <router-link :to="{ name: 'Post', params: { id: post.id }}">
            <i class="fas fa-link m-1"></i>Read more
          </router-link>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "blog-item",
  props: {
    post: {
      type: Object,
      default: () => {

      }
    }
  },
  data(){
    return {

    }
  }
}
</script>

<style scoped>

</style>