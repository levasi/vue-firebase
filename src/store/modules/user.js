const state = {
    currentUser: {}
}
const getters = {
    getCurrentUser: (state => {
        return state.currentUser
    })
}
const actions = {}
const mutations = {
    setCurrentUser: ((state, user) => {
        // console.log(user);

        state.currentUser = user
    })
}

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}