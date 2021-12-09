import Vue from 'vue';
import VueRouter from 'vue-router'
import Index from './pages/index'
import PageNotFound from './pages/page-not-found'
import Blog from "./pages/blog";
import BlogPage from "./pages/blog-page";
import BlogCreate from "./pages/blog-create";
import Comment from "./components/comment";

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Index },
    {
        path: '/blog',
        component: Blog
    },
    {
        path: '/blog-create',
        component: BlogCreate
    },
    {
        path: '/blog-post/:id',
        name: 'Post',
        component: BlogPage,
        children: [
            {
                path: 'comments',
                name: 'Comment',
                component: Comment
            }
        ]
    },
    {
        path: '*',
        component: PageNotFound
    }
]



export default new VueRouter({
    routes
});