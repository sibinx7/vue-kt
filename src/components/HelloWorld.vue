<template>
  <div class="hello container">
    <div>
      <h3>VUE JS Basics</h3>
    </div>
    <div>
      <div class="card">
        <div class="card-body">
          <table v-if="showTable" class="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John</td>
                <td>30</td>
                <td>john@outlook.com</td>
              </tr>
            </tbody>
          </table>
          <div v-else  class="alert alert-info">
            Nothing found 
          </div>
        </div>
      </div>
    </div>
    <div>      
      <div class="card">
        <div class="card-header">
          <div class="form-group">
            <div class="">
              <input v-model="simpleText" type="text" class="form-control">
            </div>
          </div>
        </div>
        <div class="card-body">
          <h5>  Value of Input {{ simpleText }} </h5>
        </div>
      </div>
    </div>
    <div class="card mt-5">
      <div class="card-header">Fruits</div>
      <div class="card-body">
        <div>
          <ul class="list-group">
          <li v-for="(fruit, index) of listOfFruits" :key="index" class="list-group-item">
            <span>{{index}}: {{ fruit.name }} </span>
          </li>
        </ul>
        </div>
      </div>
    </div>
    <clock-component :event-list="eventList"/>

  </div>
</template>

<script>
import clock from './clock.vue';
export default {
  name: 'HelloWorld',
  components: {
    clockComponent: clock 
  },
  props: {
    msg: String
  },
  data(){
    const listOfFruits = [
      {
        name: 'Orange'
      },
      {
        name: 'Apple'
      },
      {
        name: 'Mango'
      }
    ];
    const eventList = [
      {
        name: 'Event A',
        date: new Date("2021-12-3")
      },
      {
        name: 'Event B',
        date: new Date("2021-12-10")
      }
    ];
    return {
      showTable: true,
      simpleText: "Example",
      listOfFruits,
      eventList  
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
