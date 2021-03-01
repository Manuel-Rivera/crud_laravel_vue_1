<template>
  <v-app dark>

    <AppBar></AppBar>

    <LeftNavigationDrawer></LeftNavigationDrawer>

    <Main></Main>

    <Footer></Footer>
  </v-app>
</template>

<script>
import LeftNavigationDrawer from './components/LeftNavigationDrawer'
import AppBar from './components/AppBar'
import Main from './components/Main'
import Footer from './components/Footer'
export default {
  components:{
    LeftNavigationDrawer,
    AppBar,
    Main,
    Footer
  }
}
</script>
