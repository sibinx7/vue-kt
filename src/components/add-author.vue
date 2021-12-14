<template>
  <div>
    <v-row>
      <v-col md="12" class="justify-center">
        <v-card class="mb-5">
          <v-card-text>
            <v-form v-model="blogSubmit" @submit="createUser">
              <v-row>
                <v-col>
                  <v-text-field v-model="blog.id" type="number" placeholder="Author id"/>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field v-model="blog.name" placeholder="Author name"/>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select v-model="blog.admin" :items="[{ value: true, label: 'Admin'}, { value: false, label: 'NOn Admin'}]"
                            placeholder="Admin/Non Admin"
                            item-text="label" item-value="value"></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn type="submit" color="success">Add</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "add-author",
  data(){
    return {
      blog: {},
      blogSubmit: false
    }
  },
  methods: {
    ...mapActions(['addAuthor']),
    createUser(e){
      if(e && typeof e.preventDefault === "function"){
        e.preventDefault();
      }
      this.addAuthor(this.blog)
      this.blog = {}
    }
  }
}
</script>

<style scoped>

</style>