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
      <v-row>
        <v-col md="6">
          <v-card>
            <v-card-text>
              <v-list>
                <v-list-item v-for="(author,index) of authors" :key="index">
                  <v-list-item-content>
                    <h3>
                <span>
                  {{ author.name }}
                  <v-badge v-if="author.admin" content="admin"></v-badge>
                </span>

                    </h3>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-btn icon  class="float" @click="removeUser($event, author)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col md="6">
          <add-author/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import BlogItem from "../components/blog-item";
import { mapGetters, mapActions } from 'vuex';
import AddAuthor from "../components/add-author";
export default {
  name: "index",
  components: {AddAuthor, BlogItem},
  data(){
    return {
      posts: []
    }
  },
  mounted() {
    this.callBlogPosts();
  },
  computed: {
    ...mapGetters(['authors'])
  },
  methods: {
    ...mapActions(['addAuthor', 'deleteAuthor']),
    callBlogPosts: async function() {
      const response = await axios.get('http://localhost:3000/blog');
      if(response){
        this.posts = response.data;
      }
    },
    removeUser(e, author){
      e.preventDefault();
      this.deleteAuthor(author.id)
    }

  }
}
</script>

<style scoped>

</style>