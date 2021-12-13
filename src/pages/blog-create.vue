<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div class="container">
            <div class="row">
              <h2>Create your snippet's HTML, CSS and Javascript in the editor tabs</h2>
            </div>
            <form action="#"  @submit="submitBlogPost">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group form-group-sm">
                    <label for="blog-title" class="control-label">Title</label>
                    <input v-model="blog.title" type="text" class="form-control" id="blog-title" placeholder="Title">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="blog-tags" class="control-label">Tags</label>
                    <input v-model="blog.author" type="text" class="form-control" id="blog-tags" placeholder="Author">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-12">
                  <label for="blog-post"></label>
                  <textarea v-model="blog.content" id="blog-post" class="form-control" rows="5"></textarea>
                </div>
              </div>
              <div class="row mt-5">
                <div class="col-xs-12">
                  <v-btn color="success" type="submit" >
                    Submit
                  </v-btn>
                </div>
              </div>
            </form>



          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from '../libs/axios.config'
export default {
  name: "blog-create",
  data(){
    return {
      blog: {

      }
    }
  },
  methods: {
    submitBlogPost(e){
      e.preventDefault();
      axios.post('http://localhost:3000/blog/create', this.blog)
        .then((response) => {
          console.log(response)
        })
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
    console.log('Component after route enter @to')
    console.log(to)
    console.log('Component after route enter @from')
    console.log(from)
    next();
  }
}
</script>

<style scoped>

</style>