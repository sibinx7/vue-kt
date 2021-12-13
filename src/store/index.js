import Vue from 'vue';
import VueX from 'vuex';
import login from './modules/login'

Vue.use(VueX);

export default VueX.Store({
    modules: {
        login
    }
})