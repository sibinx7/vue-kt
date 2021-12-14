export default {
    state:() => {
        return {
            authors: [ {
                id: 10,
                name: 'John',
                admin: true
            },
            {
                id: 20,
                name: 'Sibin'
            },
            {
                id: 30,
                name: "Robin"
            }],
            login: false,
            blog_count: 0
        }
    },
    mutations: {
        ADD_AUTHOR_MUTATION( state, author ){
            state.authors.push(author)
        },
        DELETE_AUTHOR_MUTATION(state, authorId){
            state.authors = state.authors.filter((author => {
                return author.id !== authorId;
            }))
        }
    },
    actions: {
        addAuthor( { commit }, author){
            console.log('Inside add author...')
            console.log(author)
            commit('ADD_AUTHOR_MUTATION', author)
        },
        deleteAuthor({commit}, authorId){
            commit('DELETE_AUTHOR_MUTATION', authorId)
        }
    },
    getters: {
        authors: ( state ) => {
            console.log('Authors')
            console.log(state)
            return state.authors || [];
        },
        adminAuthors: (state) => {
            return state.authors.filter((author => author.admin))
        }
    }
}