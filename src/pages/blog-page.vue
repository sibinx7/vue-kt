<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn to="/">
          Home
          <v-icon>
            <i class="fa fa-home"></i>
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>{{ post.title}}</h2>
        <p class=" mt-4">
          {{ post.content }}
        </p>
        <div>
          <v-btn :to="{ name: 'Comment'}" >
            Show Comments
          </v-btn>
        </div>
        <div>
          <router-view></router-view>
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '../libs/axios.config';
export default {
  name: "blog-page",
  data(){
    return {
      post: {}
    }
  },
  mounted() {
    this.callPostById();
  },
  methods: {
    async callPostById(){
      const id = this.$route.params.id;
      const response = await axios.get(`http://localhost:3000/blog/show/${id}`);
      if(response){
        this.post = response.data;
      }
    }
  }
}
</script>

<style scoped>

</style>