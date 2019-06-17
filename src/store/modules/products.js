import firebase from 'firebase'

// initial state
const state = {
    all: []
}

// getters
const getters = {

}

// actions
const actions = {
    getAllProducts({ state, commit }) {
        firebase.firestore().collection('products')
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    commit('setProducts', doc.data)
                });
            });
    }
}

// mutations
const mutations = {
    setProducts(state, products) {
        state.all = products
    },

    decrementProductInventory(state, { id }) {
        const product = state.all.find(product => product.id === id)
        product.inventory--
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}