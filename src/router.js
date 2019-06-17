// 1. Define route components.
// These can be imported from other files
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Products from './components/Products.vue'
Vue.use(VueRouter)
// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    { path: '/', component: Home },
    { path: '/products', component: Products },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})
export default router
