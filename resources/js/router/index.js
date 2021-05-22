import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: () =>
        import ('../views/Index'),
    children: [
        // Dashboard
        {
            name: 'Crud',
            path: '/',
            component: () =>
                import ('../views/components/DashBoard'),
        },
        {
            name: 'calendar',
            path: '/calendar',
            component: () =>
                import ('../views/components/Calendar')
        }
    ]
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router