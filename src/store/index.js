import Vue from 'vue'
import Vuex from 'vuex'
import API from './modules/api'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    API
  },
  strict: debug
})
