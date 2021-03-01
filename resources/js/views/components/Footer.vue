<template>
     <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState(['fixed'])
    }
}
</script>
