import Vue from 'vue';
import VueX from 'vuex';
import login from './modules/login'
import blog from './modules/blog';
Vue.use(VueX);

export default new VueX.Store({
    modules: {
        login,
        blog
    }
})