import { Ajax } from '@API'
import { setStorage, storageList, getStorage } from '@UTIL'

const state = {
  mis: {}
}

const actions = {
  async [_M.GET_MIS] ({ commit }) {
    let mis = getStorage(storageList.mis)
    // console.log('fff-1', window['mis'], location.hostname, mis)
    if (window['mis']) {
      commit(_M.GET_MIS, JSON.parse(mis))
    } else if (!mis) {
      const hostname = location.hostname === 'localhost' ? '127.0.0.1' : location.hostname
      let apiInfo = {
        url: `/static/mis/${hostname}.json`,
        method: 'get'
      }
      let data = await Ajax(apiInfo)
      data && commit(_M.GET_MIS, data)
    }
  }
}

const mutations = {
  [_M.GET_MIS] (state, payload) {
    state.mis = payload
    setStorage('mis', payload)
  }
}

const getters = {
  mis: state => state.mis
}

export default {
  state,
  getters,
  actions,
  mutations
}
