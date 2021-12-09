import Vue from 'vue';
import VueRouter from 'vue-router';

import PageNotFound from './pages/page-not-found'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: ''},
    {
        path: '/blog',
        component: ''
    },
    {
        path: '/blog-create',
        component: ''
    },
    {
        path: '/blog-post/:id',
        component: '',
        children: [
            {
                path: '/comments',
                component: ''
            }
        ]
    },
    {
        path: '*',
        component: PageNotFound
    }
]

const router = new VueRouter({
    routes
});

export default router;