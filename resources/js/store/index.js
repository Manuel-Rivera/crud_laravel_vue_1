import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //AppBar
        clipped: false,
        drawer: false,
        fixed: false,
        miniVariant: false,
        right: true,
        //LeftNavigationDrawer
        drawer: false,
        valor: 0
    },
    mutations: {
        setDrawer(state, payload) {
            state.drawer = payload;
        },
        setMiniVariant(state, payload) {
            state.miniVariant = payload;
        },
        setClipped(state, payload) {
            state.clipped = payload;
        },
        setFixed(state, payload) {
            state.fixed = payload;
        }
    }
})
