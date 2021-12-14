export default {
    state:() => {
        return {
            blogs: [ {
                id: 10,
                name: 'title',
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed euismod ipsum. Donec vitae mattis nisi. Maecenas est mi, euismod ac ante sed, lacinia semper mauris. Fusce ut velit ante. Vivamus et nulla et ex aliquam tempor non ac purus. Proin at enim porttitor, venenatis ex at, sollicitudin diam. Proin laoreet nisi non massa scelerisque, vitae interdum augue auctor. Quisque semper vestibulum pharetra. Etiam quis justo a dolor fermentum pulvinar quis et nibh. Donec dapibus sagittis leo. In interdum mauris id rhoncus dapibus. Sed rhoncus, arcu quis laoreet posuere, velit felis varius dolor, vel tristique magna leo vitae mi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce ac justo consequat, convallis dui id, tincidunt velit. Aliquam ac ligula mauris."
            }]
        }
    },
    mutations: {
        ADD_BLOG_MUTATION( state, author ){
            state.blogs.push(author)
        },
        DELETE_BLOG_MUTATION(state, authorId){
            state.blogs = state.blogs.filter((blog => {
                return blog.id !== authorId;
            }))
        }
    },
    actions: {
        addBlog( { commit }, author){
            console.log('Inside add author...')
            console.log(author)
            commit('ADD_AUTHOR_MUTATION', author)
        },
        deleteBlog({commit}, authorId){
            commit('DELETE_AUTHOR_MUTATION', authorId)
        }
    },
    getters: {
        blogs: ( state ) => {
            console.log('Authors')
            console.log(state)
            return state.blogs || [];
        },

    }
}