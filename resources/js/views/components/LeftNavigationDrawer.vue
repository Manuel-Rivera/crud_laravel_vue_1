<template>
     <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
       return {
            items: [
             {
                icon: 'mdi-apps',
                title: 'Welcome',
                to: '/'
             },
             {
                icon: 'mdi-chart-bubble',
                title: 'Other component',
                to: '/other'
             }
             ]
       }
    },
    computed:{
        ...mapState(['miniVariant','clipped','fixed']),
        drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('setDrawer',val)
        },
      }
    },methods: {
    },

}
</script>
