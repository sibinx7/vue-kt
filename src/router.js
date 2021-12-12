import Vue from 'vue';
import VueRouter from 'vue-router'
import Index from './pages/index'
import PageNotFound from './pages/page-not-found'
import Blog from "./pages/blog";
import BlogPage from "./pages/blog-page";
import BlogCreate from "./pages/blog-create";


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
        }
    },
    {
        path: '*',
        component: PageNotFound
    }
]



const router =  new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        console.log(to)
        console.log(from)
        console.log(savedPosition)
        // return desired position
        return { x: 0, y: 0 } // return to browser 0,0 position
    }
});


router.beforeEach((to, from, next) => {
    console.log('Previous router')
    console.log(from)
    console.log('Current router')
    console.log(to)
    next();
});

router.afterEach((to, from) => {
    console.log(to)
    console.log(from)
})

export default router;