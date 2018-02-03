import { Ajax, API } from '@API'
import youbikeJSON from '@DATA/youbike'

const state = {
  getData: {}
}

const actions = {
  async [_M.GET_DATA] ({ commit }, payload) {
    let data = process.env.NODE_ENV === 'development' ? await Ajax(API.youbike, payload) : youbikeJSON
    data && commit(_M.GET_DATA, data.retVal)
  }
}

const mutations = {
  [_M.GET_DATA] (state, payload) {
    state.getData = payload
  }
}

const getters = {
  getData: state => state.getData
}

export default {
  state,
  getters,
  actions,
  mutations
}
