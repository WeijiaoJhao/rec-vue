<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getStorage, storageList } from '@UTIL'

export default {
  name: 'App',
  created () {
    this[_M.GET_MIS]()
    document.title = getStorage(storageList.mis).DOCUMENT_TITLE_EN
  },
  methods: {
    ...mapActions([
      _M.GET_MIS
    ])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
