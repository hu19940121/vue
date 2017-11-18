<template>
  <div id="app">
        <m-header />
        <tab></tab>
        <router-view></router-view>
        <!-- test -->
       <player />
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header.vue'
import tab from './components/tab/tab.vue'
import player from './components/player/player.vue'

export default {
  components: {
    MHeader,
    tab,
    player,
  },
  created(){



  }

}
</script>

<style lang="stylus">


</style>
