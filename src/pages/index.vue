<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div v-for="(post, index) of posts" :key="index">
            <blog-item :post="post" class="mb-5"></blog-item>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import BlogItem from "../components/blog-item";
export default {
  name: "index",
  components: {BlogItem},
  data(){
    return {
      posts: []
    }
  },
  mounted() {
    this.callBlogPosts();
  },
  methods: {
    callBlogPosts: async function() {
      const response = await axios.get('http://localhost:3000/blog');
      if(response){
        this.posts = response.data;
      }


    }
  }
}
</script>

<style scoped>

</style>