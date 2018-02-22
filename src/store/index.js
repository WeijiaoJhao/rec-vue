import Vue from 'vue'
import Vuex from 'vuex'
import API from './modules/api'
import MIS from './modules/mis'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    API,
    MIS
  },
  strict: debug
})
