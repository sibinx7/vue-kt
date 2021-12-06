<template>
  <div class="clock-background">
    <div id="clock">
      <p class="date">{{ date }}</p>
      <p class="time">{{ time }}</p>
      <p class="text">DIGITAL CLOCK with Vue.js</p>
    </div>
    <div class="card">
      <div class="card-header">
        Current Events 
      </div>
      <div class="card-body">
        <ul class="list-group">
          <li v-for="(event, index) of eventList" :key="index" class="list-group-item">
            <div :class="[computedClass, {'alert-danger': eventIsOverNot(event.date), 'alert-success': !eventIsOverNot(event.date)}]" class="alert">
              {{ event.name }} 
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>


export default ({
  name: 'clock',
  props: {
    eventList: {
      type: Array,
      default:() => []
    }
  },
  data:() => {
    var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return {
      week,
      time: '',
      date: '',
      timerID: null 
    }
  },
  computed: {
    computedClass(){
      const date = new Date();
      return `${date.getMonth()+1} event`
    }
  },

  mounted(){
    this.timerID = setInterval(this.updateTime, 1000);
  },
  destroyed(){    
    clearInterval(this.timerID);
  },
  methods:{
    updateTime() {
      var cd = new Date();
      this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
      this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth()+1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + this.week[cd.getDay()];
    },
    zeroPadding(num, digit) {
      var zero = '';
      for(var i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    },
    eventIsOverNot(date){
      const currentDate = new Date();    
      if (date.setHours(0, 0, 0, 0) <= currentDate.setHours(0, 0, 0, 0)) {
        return true;
      }
      return false;    
    }
  }
})
</script>
<style  scoped>
.clock-background{
   background: #0f3854;
    background: radial-gradient(ellipse at center,  #0a2e38  0%, #000000 70%);
    background-size: 100%;
    padding: 100px;
    margin-top: 100px;
    margin-bottom: 100px;
}
p {
    margin: 0;
    padding: 0;
}
#clock {
    font-family: 'Share Tech Mono', monospace;
    color: #ffffff;
    text-align: center;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #daf6ff;
    text-shadow: 0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0);
}
    .time {
        letter-spacing: 0.05em;
        font-size: 80px;
        padding: 5px 0;
    }
    .date {
        letter-spacing: 0.1em;
        font-size: 24px;
    }
    .text {
        letter-spacing: 0.1em;
        font-size: 12px;
        padding: 20px 0 0;
    }

</style>
