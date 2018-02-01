import { Ajax, API } from '@API'

const state = {
  getData: {}
}

const actions = {
  async [_M.GET_DATA] ({ commit }, payload) {
    let data = await Ajax(API.youbike, payload)
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
