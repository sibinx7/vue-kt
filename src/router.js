import Vue from 'vue';
import VueRouter from 'vue-router'
import Index from './pages/index'
import PageNotFound from './pages/page-not-found'
import Blog from "./pages/blog";
import BlogPage from "./pages/blog-page";
import BlogCreate from "./pages/blog-create";
import Login from "./pages/login";


Vue.use(VueRouter);

const routes = [
    { path: '/', component: Index },
    {
        path: '/blog',
        component: Blog
    },
    {
        path: '/blog-create',
        component: BlogCreate,
        meta: { requiresAuth: true }
    },
    {
        path: '/blog-post/:id',
        name: 'Post',
        component: BlogPage,
        children: [
            {
                path: 'comments',
                name: 'Comment', // Lazy loading
                component: () => import(/* webpackChunkName: "comment" */ './components/comment')
            }
        ],
        beforeEnter: (to, from, next) => {
            console.log('Blog post to')
            console.log(to)
            console.log('Blog post from')
            console.log(from)
            console.log(next)
            next();
        }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
        path: '*',
        component: PageNotFound
    }
]



const router =  new VueRouter({
    routes,
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
});


router.beforeEach((to, from, next) => {
    console.log('Before each main guard')
    console.log('Previous router')
    console.log(from)
    console.log('Current router')
    console.log(to)
    next();
});

router.afterEach((to, from) => {
    console.log('After each main guard')
    console.log(to)
    console.log(from)
})

export default router;