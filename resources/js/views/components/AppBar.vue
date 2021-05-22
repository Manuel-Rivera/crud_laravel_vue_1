<template>
   <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
    <v-app-bar-nav-icon    @click.stop="setDrawer(!drawer)"/>


      <v-btn
        icon
        @click.stop="setMiniVariant(!miniVariant)"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-btn
        icon
        @click.stop="setClipped(!clipped)"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>

      <v-btn
        icon
        @click.stop="setFixed(!fixed)"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />



    </v-app-bar>


</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    data:()=>({
    title: 'Vuetify.js'
    }),
    computed:{
        ...mapState(['clipped','drawer','fixed','miniVariant','right','rightDrawer']),
    },
    mounted() {
    },
    methods: {
      ...mapMutations(['setDrawer','setMiniVariant','setClipped','setFixed']),
    }
}
</script>
